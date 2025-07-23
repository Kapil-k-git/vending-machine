import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {  
      const errorMessage = result.error.issues.map(issue => issue.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }

    req.body = result.data;
    next();
  };
};
