import { Book } from "../Domain/Book";
import { Dao } from "./Dao";

export interface BookDao extends Dao<Book>{}