const getFlowAttr = ({flow_attr, sqlQuery}) => {
    const regex = /AS\s+([^\s,]+)/g;
    const matches = [];
    let match;
    while (match = regex.exec(sqlQuery)) {
        matches.push(match[1]);
    }
    flow_attr.sql = sqlQuery;
    flow_attr.column_info = matches;
}

export default getFlowAttr;
