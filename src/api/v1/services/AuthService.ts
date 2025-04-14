import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@/errors";

export class AuthService {
	private readonly jwtSecret: string;
	private readonly jwtExpiresIn: string;

	constructor() {
		this.jwtSecret = process.env.JWT_SECRET || "default_secret"; // Use uma variável de ambiente para o segredo
		this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h"; // Tempo de expiração do token
	}

	// Gera um token JWT
	generateToken(payload: object): string {
		return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
	}

	// Verifica e decodifica um token JWT
	verifyToken(token: string): object {
		try {
			return jwt.verify(token, this.jwtSecret);
		} catch (error) {
			throw new UnauthorizedError("Invalid or expired token");
		}
	}

	// Middleware para proteger rotas
	static authenticate(req: any, res: any, next: any): void {
		try {
			const authHeader = req.headers.authorization;

			if (!authHeader || !authHeader.startsWith("Bearer ")) {
				throw new UnauthorizedError("Authorization token is missing or invalid");
			}

			const token = authHeader.split(" ")[1];
			const decoded = new AuthService().verifyToken(token);

			// Adiciona os dados decodificados ao objeto `req` para uso posterior
			req.user = decoded;
			next();
		} catch (error) {
			next(error);
		}
	}
}
