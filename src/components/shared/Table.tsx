export const Table = (props) => {
  return (
    <div>
      <table className="table table-bordered text-center caption-top table-striped table-responsive">
        <thead>
          {props.headers.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </thead>
        <tbody>
          {props.data.map((row, idx) => {
            return (
              <tr key={idx}>
                {props.headers.map((key, i) => {
                  return <td key={i}>{row[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
