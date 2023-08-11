
import BicycleDataMapper from "./BicycleDataMapper";
import BicycleData from "./BicycleData";

let bicycleData = new BicycleData(1, "Trek Z-80", "Guy")
let bicycleDataDOM = BicycleDataMapper.mapToDOMObject(bicycleData)

