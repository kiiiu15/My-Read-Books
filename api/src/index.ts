//import express from "express";
import { AuthorJsonFileDao } from './Dao/AuthorJsonFileDao';
import {Author} from "./Domain/Author";

/*
const server = express();
server.listen(3000);*/

const dao = new AuthorJsonFileDao();
const author = new Author(new Date().getTime(), "Yo 2");
//dao.add(author);
dao.getAll().then(console.log)

