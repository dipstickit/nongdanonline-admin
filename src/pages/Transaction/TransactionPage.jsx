import TransactionCardList from '../../components/Transaction/Card/TransactionCardList';
import TransactionTable from '../../components/Transaction/TransactionTable';
import {
  // useGetFarmTransactionListQuery,
  useGetTransactionHistoryListQuery,
  useGetTransactionListQuery,
  // useGetTransactionShippingListQuery,
} from '../../features/transactions/transactionApi';

const TransactionPage = () => {
  const { data: transData } = useGetTransactionListQuery();
  // const { data: transFarmData } = useGetFarmTransactionListQuery();
  const { data: transFullData } = useGetTransactionHistoryListQuery();
  // const { data: transShippingData } = useGetTransactionShippingListQuery();

  return (
    console.log(transData),
    (
      <>
        <h1>Giao dịch</h1>
        <TransactionCardList transFullData={transFullData?.data} />
        <TransactionTable transData={transData?.data} />
      </>
    )
  );
};

export default TransactionPage;
