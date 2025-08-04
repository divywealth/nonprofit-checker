import { User } from "./src/account/entities/user.entity";



declare global {
    namespace Express {
      interface Request {
        user?: User // Add your user property here
      }
    }
  }