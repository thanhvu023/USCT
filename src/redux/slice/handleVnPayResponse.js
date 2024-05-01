import instance from "../axiosCustom";

const handleVnPayResponse = async (searchParams) => {
    const params = new URLSearchParams(searchParams);
    const postData = {
        vnpAmount: params.get('vnp_Amount'),
        vnpBankCode: params.get('vnp_BankCode'),
        vnpBankTranNo: params.get('vnp_BankTranNo'),
        vnpCardType: params.get('vnp_CardType'),
        vnpOrderInfo: params.get('vnp_OrderInfo'),
        vnpPayDate: params.get('vnp_PayDate'),
        vnpResponseCode: params.get('vnp_ResponseCode'),
        vnpTmnCode: params.get('vnp_TmnCode'),
        vnpTransactionNo: params.get('vnp_TransactionNo'),
        vnpTransactionStatus: params.get('vnp_TransactionStatus'),
        vnpTxnRef: params.get('vnp_TxnRef'),
        vnpSecureHash: params.get('vnp_SecureHash')
    };
    console.log(" vnpOrderInfo là ",postData.vnpOrderInfo);
    for (let key in postData) {
        if (postData[key] === null) {
            console.error(`Missing parameter: ${key}`);
            throw new Error(`Missing required payment parameter: ${key}`);
        }
    }
 if (!postData.vnpOrderInfo) {
    console.error("Missing parameter: vnpOrderInfo");
    throw new Error("Missing required payment parameter: vnpOrderInfo");
}else{
    console.log(" vnpOrderInfo là ",postData.vnpOrderInfo);

}
    try {
        const response = await instance.post('/payment/vnpay-ipn-manual', postData);
        console.log('VNPAY IPN Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending VNPAY IPN data:', error);
        throw error;
    }
};

export default handleVnPayResponse;
