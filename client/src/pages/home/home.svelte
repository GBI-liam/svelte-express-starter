<script>
    import axios from "axios";

    let displayValue="Nothing to show...";
    function handleClick() {
        axios.get("api/test").then((res) => {
            displayValue = res.data;
        });
    }

</script>
<section>
    <div>
        this is the home page
    </div>
    <button on:click={handleClick}>
        Test
    </button>
    <div>
        {displayValue}
    </div>
</section>