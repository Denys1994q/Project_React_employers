import "./app-filter.css";

const AppFilter = ({filterName, onFilterSelect}) => {
    const buttonsData = [
        { name: 'all', label: 'Все сотрудники' },
        { name: 'rise', label: 'На повышение' },
        { name: 'salary', label: 'З/П больше 1000$' },
    ]

    const buttons = buttonsData.map(({ name, label }) => {
        const active = filterName == name; // в active запишеться true, якщо все ок
        const clazz = active ? 'btn-light' : 'btn-outline-light'
        return (
            <button type="button"
                key={name}
                onClick={() => onFilterSelect(name)}
                className={`btn ${clazz}`}>
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;