export default () => {
    return {
        port: 3000,
        defaultFormatDate: 'YYYY-MM-DD HH:mm:ss',
        mongoUrlConnection: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-q8fqh.mongodb.net/test?retryWrites=true&w=majority`
    }
}