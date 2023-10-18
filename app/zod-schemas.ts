import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1 ,'Title is Required').max(255),
    description: z.string().min(1 ,'Description is Required')
});

export const patchissueSchema =  z.object({
    title: z.string().min(1 ,'Title is Required').max(255).optional(),
    description: z.string().min(1 ,'Description is Required').optional(),
    assignedTo: z.string().min(1 ,'Assigned to User is Required').optional().nullable()
});
