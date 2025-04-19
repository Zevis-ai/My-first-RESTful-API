export const api = async () => {
    let url = "http://127.0.0.1:3000/articles";
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Articles:", data);
    } catch (err) {
        console.error("Error fetching articles:", err);
    }
};


