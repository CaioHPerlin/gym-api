import { UserDbSelect } from "@/api/v1/models";
import { createUserSchema, updateUserSchema } from "@/api/v1/schemas";
import { z } from "zod";

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UserDto = Omit<UserDbSelect, "password"> & { password?: never };
