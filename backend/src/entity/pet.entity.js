"use strict";
import { EntitySchema } from "typeorm";

const PetSchema = new EntitySchema({
  name: "Pet",
  tableName: "pets",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 255,
      nullable: false,      
    },
    date_of_birth: {
      type: "date",
      nullable: false,
    },
    species: {
      type: "varchar",
      length: 64,
      nullable: false,    
    },
    breed: {
      type: "varchar",
      length: 64,
      nullable: false,    
    },
    price: {
      type: "int",
      nullable: false,
    },
    description: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    neutered: {
      type: "boolean",
      nullable: false,
    },
    vaccinated: {
      type: "boolean",
      nullable: false,
    },
    special_needs: {
      type: "boolean",
      nullable: false,
    },
    declawed: {
      type: "boolean",
      nullable: false,
    },
    color: {
      type: "varchar",
      length: 6,
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_PET",
      columns: ["id"],
      unique: true,
    },
  ],
});

export default PetSchema;