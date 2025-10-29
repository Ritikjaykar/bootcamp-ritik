#!/usr/bin/env node
import { Command } from "commander";
import { checkConfig } from "./drill2_config";
import { importUsers } from "./drill7_users/importUsers";
import { listUsers } from "./drill7_users/listUsers";
import { addUser } from "./drill7_users/addUser";

const program = new Command();
program.name("cli-drills").version("1.0.0");

program.command("config:check").action(checkConfig);
program.command("users:import <file.csv>").action(importUsers);
program.command("users:list").action(listUsers);
program.command("users:add").requiredOption("--name <name>").action(addUser);

program.parse();
