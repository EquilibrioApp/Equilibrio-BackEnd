import { UserEntity } from "src/users/users.entity";

//Estructura que va a llegar al endpoint del registro del expediente
export class ExpedienteDto {
  //Expediente 
  id?: string;
  doctorId : UserEntity;
  sexo: string;
  createdAt: Date;
  updatedAt: Date;
  alturaPaciente: number;
  //avances: AvancesPostEntity[]
  //Meta
  //Avances
}

//Respuesta al crear expediente
export class ExpedienteResponseDto{
    id: string;
    doctor:UserEntity;
    sexo: string;
    birthDate: Date;
    nombre: string;
    createdAt: Date;
    alturaPaciente: number;
}


export interface MealsResponseDto {
  recipe: Recipe;
  _links: Links;
}

export interface Links {
  self: Self;
}

export interface Self {
  href:  string;
  title: Title;
}

export enum Title {
  Self = "Self",
}

export interface Recipe {
  uri:             string;
  label:           string;
  image:           string;
  images:          Images;
  source:          string;
  url:             string;
  shareAs:         string;
  yield:           number;
  dietLabels:      string[];
  healthLabels:    string[];
  cautions:        Caution[];
  ingredientLines: string[];
  ingredients:     Ingredient[];
  calories:        number;
  totalWeight:     number;
  totalTime:       number;
  cuisineType:     CuisineType[];
  mealType:        MealType[];
  dishType:        DishType[];
  totalNutrients:  { [key: string]: Total };
  totalDaily:      { [key: string]: Total };
  digest:          Digest[];
}

export enum Caution {
  Eggs = "Eggs",
  Fodmap = "FODMAP",
  Gluten = "Gluten",
  Milk = "Milk",
  Sulfites = "Sulfites",
  Wheat = "Wheat",
}

export enum CuisineType {
  American = "american",
  Mexican = "mexican",
  Nordic = "nordic",
}

export interface Digest {
  label:        string;
  tag:          string;
  schemaOrgTag: SchemaOrgTag | null;
  total:        number;
  hasRDI:       boolean;
  daily:        number;
  unit:         Unit;
  sub?:         Digest[];
}

export enum SchemaOrgTag {
  CarbohydrateContent = "carbohydrateContent",
  CholesterolContent = "cholesterolContent",
  FatContent = "fatContent",
  FiberContent = "fiberContent",
  ProteinContent = "proteinContent",
  SaturatedFatContent = "saturatedFatContent",
  SodiumContent = "sodiumContent",
  SugarContent = "sugarContent",
  TransFatContent = "transFatContent",
}

export enum Unit {
  Empty = "%",
  G = "g",
  Kcal = "kcal",
  Mg = "mg",
  Μg = "µg",
}

export enum DishType {
  CondimentsAndSauces = "condiments and sauces",
  MainCourse = "main course",
  Salad = "salad",
  Sandwiches = "sandwiches",
}

export interface Images {
  THUMBNAIL: Large;
  SMALL:     Large;
  REGULAR:   Large;
  LARGE?:    Large;
}

export interface Large {
  url:    string;
  width:  number;
  height: number;
}

export interface Ingredient {
  text:         string;
  quantity:     number;
  measure:      null | string;
  food:         string;
  weight:       number;
  foodCategory: string;
  foodId:       string;
  image:        null | string;
}

export enum MealType {
  Breakfast = "breakfast",
  Brunch = "brunch",
  LunchDinner = "lunch/dinner",
}

export interface Total {
  label:    string;
  quantity: number;
  unit:     Unit;
}

export interface mealRequest {
  buscarRecetas: string
}




/*create table expediente (
  id_expediente serial primary key, 
  id_especialista bigint,  
  id_paciente bigint, 
  id_meta bigint, 
  altura_paciente float);
*/