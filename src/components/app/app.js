import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {name: 'John J.', salary: 800, increase: false, active: false, id: 1},
        {name: 'Alex M.', salary: 3000, increase: false, active: false, id: 2},
        {name: 'Carl W.', salary: 4000, increase: true, active: true, id: 3},
      ],
      term: '',
      filterName: 'all',
    }
    this.maxId = 3;
  }

  // видалити робітника 
  deleteItem = (idFromClick) => { 
    this.setState(({data}) => {

      // перший спосіб видалити 
      // const index = data.findIndex(elem => elem.id === idFromClick); // індекс елементу, який треба видалити з data. Порівнюємо індекс елементу, по якому клікнули з індексом елементу в data. Знаходимо індекс того елементу який треба видалити (але як в масиві звичайному, 0 замість 1, хоч id = 1)
      // const before = data.slice(0, index); // треба створити копію масиву data. Прямо мутувати масив заборонено. Вирізаємо з дати з початку і до індексу. 
      // const after = data.slice(index+1); // вирізаємо з індексу і до кінця масиву. 
      // const newArr = [...before, ...after]; // об'єднуємо вирізані частини (без видаленого елемента) в новий масив 
      // return {
      //   data: newArr
      // }

      // другий спосіб видалити
      return {
        data: data.filter(item => item.id !== idFromClick) // залишаться тільки ті елементи, id яких не співпадає з тим id, який нам прийшов 
      }
    })
  }
  // додати нового робітника 
  addItem = (e, nameFromInput, salaryFromInput) => {
    e.preventDefault()
    this.maxId++;
    if (nameFromInput.length < 3 || !salaryFromInput) return;
      this.setState(({data}) => {
        const newEmployer = {
          name: nameFromInput,
          salary: salaryFromInput,
          increase: false,
          active: false,
          id: this.maxId
        }
        const newArr = data.slice();
        newArr.push(newEmployer);
        return {
          data: newArr
        }
      })
  }
  // виділити робітника 
  onToggleIncrease = (idFromClick) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === idFromClick); // індекс елемента, по якому клікнули 
      const old = data[index]; // копія елементу для роботи з нею
      const newItem = {...old, increase: !old.increase}; // новий елемент: всі свойства старого + свойство increase поміняне на протилежне 
      const newArray = [...data.slice(0, index), newItem, ...data.slice(index+1)] // новий масив, у який входить новий елемент 
      return {
        data: newArray
      }
    })
  }
  // виділити робітника (підвищити зірочкою) 
  onToggleRise = (idFromClick) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === idFromClick); // індекс елемента, по якому клікнули 
      const old = data[index]; // копія елементу для роботи з нею
      const newItem = {...old, active: !old.active}; // новий елемент: всі свойства старого + свойство increase поміняне на протилежне 
      const newArray = [...data.slice(0, index), newItem, ...data.slice(index+1)] // новий масив, у який входить новий елемент 
      return {
        data: newArray
      }
    })
  }

  // пошук робітника. Ми не міняємо state, а просто робимо return того, що нам треба 
  searchEmp = (letters, array) => { // що ми шукаємо (букви з інпута) і де ми шукаємо (масив з робітниками) 
    if (letters.length === 0) { // якщо нічого не ввів користувач, то просто повертаємо той масив, який є 
      return array;
    }
    return array.filter(item => { // в іншому випадку фільтруємо масив по letters з інпута 
      return item.name.indexOf(letters) > -1 // повертаємо того робітника чи робітників з масиву, в якого знайдено збіг в name по letters
    })
  }
  getInfoForSearchProcess = (letters) => {
    this.setState({
      term: letters
    })
  }
  // фільтр робітників. Ми не міняємо state, а просто робимо return того, що нам треба 
  filterPost = (array, filter) => {
    switch (filter) {
      case 'rise':
        return array.filter(item => item.active)
      case 'salary':
        return array.filter(item => item.salary > 1000)
      default: 
        return array;
    }
  }
  onFilterSelect = (filter) => {
    this.setState({
      filterName: filter
    })
  }
  changeSalaryFromInput = (salaryFromInput, idFromInput) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === idFromInput); // індекс елемента, по якому клікнули 

      const old = data[index]; // копія елементу масиву, по якому клікнули, для роботи з нею
      const newItem = {...old, salary: salaryFromInput}; // оновили цю копію: всі свойства старого + свойство salary поміняне на нове (значення з інпута) 

      const newArray = [...data.slice(0, index), newItem, ...data.slice(index+1)] // новий масив, у який входить новий елемент 

      return {
        data: newArray
      }
    })
  }
  
 
  
  render() {
    const {data, term, filterName} = this.state;
    const numberOfEmployers = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase === true);
    const numberOfEmployersToIncrease = increased.length;
    const visibleData = this.filterPost(this.searchEmp(term, data), filterName); // комбінуємо методи. Фільтруємо відфільтрований масив. 
    return (
      <div className="app">
          <AppInfo numberOfEmployers={numberOfEmployers}
          numberOfEmployersToIncrease={numberOfEmployersToIncrease} />
          <div className="search-panel">
              <SearchPanel
               getInfoForSearchProcess={this.getInfoForSearchProcess} />
              <AppFilter
               filterName={this.state.filterName}
               onFilterSelect={this.onFilterSelect}/>
          </div>
          <EmployeesList 
          data={visibleData} 
          onDelete={this.deleteItem} 
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise}
          changeSalaryFromInput={this.changeSalaryFromInput}
          />
          <EmployeesAddForm addItem={this.addItem} />
      </div>
    );
  }
}

export default App;
