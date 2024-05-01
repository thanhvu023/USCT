import instance from "../axiosCustom";

const handleVnPayResponse = async (searchParams) => {
    const params = new URLSearchParams(searchParams);
    const postData = {
        vnp_Amount: params.get('vnp_Amount'),
        vnp_BankCode: params.get('vnp_BankCode'),
        vnp_BankTranNo: params.get('vnp_BankTranNo'),
        vnp_CardType: params.get('vnp_CardType'),
        vnp_OrderInfo: params.get('vnp_OrderInfo'),
        vnp_PayDate: params.get('vnp_PayDate'),
        vnp_ResponseCode: params.get('vnp_ResponseCode'),
        vnp_TmnCode: params.get('vnp_TmnCode'),
        vnp_TransactionNo: params.get('vnp_TransactionNo'),
        vnp_TransactionStatus: params.get('vnp_TransactionStatus'),
        vnp_TxnRef: params.get('vnp_TxnRef'),
        vnp_SecureHash: params.get('vnp_SecureHash')
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
