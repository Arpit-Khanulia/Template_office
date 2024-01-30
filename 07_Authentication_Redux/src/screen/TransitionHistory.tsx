import { useGetLastMonthDataQuery } from "../Redux/Slices/Auth";
import Table from "../Components/Table";
import TableHeading from "../Components/TableHeading";

const TransitionHistory = () => {
  const { data } = useGetLastMonthDataQuery();
  console.log(`this is data ${JSON.stringify(data)} `);

  return (
    <div>
      
      <TableHeading/>
      {data?.map((e)=> (<Table
      
      key={e.timestamp}
      id = {e.id}
      amount = {e.amount}
      timestamp = {e.timestamp}
      
      />))}

      

    </div>
  );
};

export default TransitionHistory;
