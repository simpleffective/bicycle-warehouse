import BicycleData from "./BicycleData";

export default class BicycleDataMapper {

  // Function to create a DOM object from a BicycleData instance
  static mapToDOMObject(bicycleData) {
    const divElement = document.createElement('div');
    divElement.setAttribute('data-id', dataInstance.id);
    
    const nameLabel = document.createElement('p');
    nameLabel.textContent = `Name: ${dataInstance.name}`;
    
    const valueLabel = document.createElement('p');
    valueLabel.textContent = `Value: ${dataInstance.value}`;
    
    divElement.appendChild(nameLabel);
    divElement.appendChild(valueLabel);
    
    return divElement;
  }
}