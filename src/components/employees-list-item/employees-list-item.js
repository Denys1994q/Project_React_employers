import './employees-list-item.css';

const EmployeesListItem = (props) => {
    const {name, salary, onDelete, onToggleIncrease, onToggleRise, increase, active, changeSalaryFromInput, forId} = props;

    let classes = 'list-group-item d-flex justify-content-between';
    if (increase) {
        classes = 'list-group-item d-flex justify-content-between increase';
    }
    if (active) {
        classes = 'list-group-item d-flex justify-content-between like';
    }
    if (active && increase) {
        classes = 'list-group-item d-flex justify-content-between increase like' ;
    }

    return (
        <li className={classes}>
            <span onClick={onToggleRise} className="list-group-item-label">{name}</span>
            <input type="text" onChange={(e) => changeSalaryFromInput(e.target.value, forId)} className="list-group-item-input" defaultValue={salary} />
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button" onClick={onToggleIncrease}
                    className="btn-cookie btn-sm ">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;