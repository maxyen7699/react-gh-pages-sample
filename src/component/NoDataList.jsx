function NoDataList ({tag}) {
    return(
        <li>
            <label className="todoList_label">
                {tag !== 'FINISHED' ? <span>目前尚無待辦事項</span> : <span>目前尚無已完成事項</span> }
            </label>
        </li>     
    )
}

export default NoDataList;