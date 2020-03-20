import CodeGenerator from 'node-code-generator';
const codeGenerator = new CodeGenerator();

export default (size = 6) => {
    const codes = codeGenerator.generateCodes('*+', size);
    return codes.join('');
}
