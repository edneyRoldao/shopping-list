export default () => {
    return {
        port: 3000,
        mongoUrlConnection: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-q8fqh.mongodb.net/test?retryWrites=true&w=majority`
    }
}