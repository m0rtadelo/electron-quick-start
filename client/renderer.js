window.onload = async function() {
    const result = await window.api.post("All right!");
    console.log(result);
};
