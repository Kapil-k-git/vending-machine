import React, { useState, useEffect } from "react";
import { Chocolate } from "@/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useVendingMachine } from "../hooks/useVendingMachine";

const ChocolateList = () => {
  const {
    chocolates,
    userCash,
    loading,
    message,
    setMessage,
    fetchInventory,
    restockChocolate,
    buyChocolate,
    addCash,
  } = useVendingMachine();

  const [restockInputs, setRestockInputs] = useState<{
    [name: string]: number;
  }>({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedChocolate, setSelectedChocolate] = useState<Chocolate | null>(
    null
  );
  const [insertedCash, setInsertedCash] = useState<number>(0);
  const [modalError, setModalError] = useState<string>("");
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number | "">("");
  const [currentlyRestocking, setCurrentlyRestocking] = useState<string>("");

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    if (message) setAlertOpen(true);
  }, [message]);

  const handleRestock = async (name: string) => {
    const qty = restockInputs[name] || 0;
    if (qty <= 0) {
      setMessage(`⚠️ Enter a valid restock quantity for ${name}.`);
      return;
    }
    await restockChocolate(name, qty);
    setRestockInputs((prev) => ({ ...prev, [name]: 0 }));
    setCurrentlyRestocking("");
  };

  const handleBuyConfirm = async () => {
    if (!selectedChocolate) return;
    const { name, price } = selectedChocolate;

    if (insertedCash < price) {
      setModalError("Not enough cash inserted.");
      return;
    }

    if (userCash < insertedCash) {
      setModalError("Insufficient balance.");
      return;
    }

    const quantity = Math.floor(insertedCash / price);
    const result = await buyChocolate(name, insertedCash, quantity);

    if (result.success) {
      setSelectedChocolate(null);
    } else {
      setModalError(result.error || "Something went wrong.");
    }
  };

  const handleAddBalance = async () => {
    const amount = Number(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("⚠️ Please enter a valid top-up amount.");
      return;
    }
    await addCash(amount);
    setTopUpAmount("");
    setBalanceModalOpen(false);
  };

  const openBuyModal = (choc: Chocolate) => {
    setSelectedChocolate(choc);
    setInsertedCash(0);
    setModalError("");
  };

  return (
    <Box p={4}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Typography variant="h6" color="textSecondary">
            Loading...
          </Typography>
        </Box>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
            {chocolates.map((choc, idx) => (
              <Box key={idx} width={300}>
                <Card>
                  <CardMedia
                    component="img"
                    image={`/${choc.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}.jpg`}
                    alt={choc.name}
                    sx={{
                      height: 80,
                      width: "auto",
                      objectFit: "contain",
                      mx: "auto",
                      mt: 2,
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = "/default-chocolate.png";
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{choc.name}</Typography>
                    <Typography>💵 Price: ${choc.price}</Typography>
                    <Typography>📦 Quantity: {choc.quantity}</Typography>
                    {choc.quantity < 10 &&
                      currentlyRestocking === choc.name && (
                        <>
                          <TextField
                            type="number"
                            label="Restock Quantity"
                            value={restockInputs[choc.name] || ""}
                            onChange={(e) =>
                              setRestockInputs((prev) => ({
                                ...prev,
                                [choc.name]: Number(e.target.value),
                              }))
                            }
                            fullWidth
                            margin="normal"
                            size="small"
                            sx={{ mt: 2 }}
                          />
                          <Box display="flex" gap={1} mt={2}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="success"
                              onClick={() => {
                                handleRestock(choc.name);
                                setCurrentlyRestocking("");
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              fullWidth
                              variant="outlined"
                              color="error"
                              onClick={() => setCurrentlyRestocking("")}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </>
                      )}

                    <Box display="flex" gap={1} mt={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => openBuyModal(choc)}
                      >
                        Buy Now
                      </Button>

                      {choc.quantity < 10 &&
                        currentlyRestocking !== choc.name && (
                          <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            onClick={() => setCurrentlyRestocking(choc.name)}
                          >
                            Restock
                          </Button>
                        )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
          <Box mt={5} textAlign="center">
            <Typography variant="h6">
              💰 Your Balance:{" "}
              <span style={{ color: "#d81b60" }}>${userCash}</span>
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => setBalanceModalOpen(true)}
            >
              Enter Balance
            </Button>
          </Box>
        </>
      )}

      <Dialog
        open={!!selectedChocolate}
        onClose={() => setSelectedChocolate(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { minHeight: 250, padding: 2 } }}
      >
        <DialogTitle>Buy {selectedChocolate?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1 }}>
            💵 Price: <strong>${selectedChocolate?.price}</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            📦 In Stock: <strong>{selectedChocolate?.quantity}</strong>
          </Typography>

          <TextField
            label="Insert Cash"
            placeholder="Enter your amount"
            type="number"
            fullWidth
            value={insertedCash === 0 ? "" : insertedCash}
            onChange={(e) => setInsertedCash(Number(e.target.value))}
            sx={{ mt: 1 }}
          />

          {modalError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {modalError}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedChocolate(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleBuyConfirm}>
            Buy Now
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={balanceModalOpen}
        onClose={() => setBalanceModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { padding: 2 } }}
      >
        <DialogTitle>Enter Balance</DialogTitle>
        <DialogContent>
          <TextField
            label="Top-up Amount"
            placeholder="Enter your balance"
            type="number"
            fullWidth
            value={topUpAmount}
            onChange={(e) =>
              setTopUpAmount(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBalanceModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddBalance}>
            Add Balance
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={message.startsWith("") ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChocolateList;
