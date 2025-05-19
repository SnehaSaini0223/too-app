export const formatDate = (dateString) => {
    let date = new Date(dateString);
    return `
    ${date.getDate()}
    ${date.toLocaleDateString("en-US", { month: 'short' })} 
    ${date.getFullYear()} 
    ${date.toLocaleString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })}`
}

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};