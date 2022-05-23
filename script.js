window.onload = function (){
    showsApp.init();
}
let showsApp = {
    data: null,
    searchInput: null,
    showsDataSection: null,


    init: function(){
        console.log("start apki");
        this.searchInput = document.getElementById("search-input");
        this.searchInput.addEventListener("keyup", (e) => {
            if(e.keyCode == 13){
                console.log("enter");
                this.loadData(this.searchInput.value);
            }
        });
        this.showsDataSection = document.querySelector(".shows-data-section"); //querySelector
        this.loadData("friends");

    },
    loadData: function(str){
        fetch("https://api.tvmaze.com/search/shows?q=" + str.trim())
        .then(response => response.json())
        .then(data => this.dataReady(data))
    },
    dataReady: function(showData){
        this.data = showData;

        // console.log(showData);


        let allBoxesHtml = "";

        for(let i = 0; i < showData.length; i++){
            let show = showData[i];
            let score = show.score;
            show = show.show;
            console.log(show);

            let genres = show.genres.join(", ");
            console.log(genres);

            let imgSrc = null;
            let imgSrcOriginal = null;
            if(show.image){
                imgSrc = show.image.medium;
                imgSrcOriginal = show.image.original;
            } else {
                imgSrc = "https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787__480.png";
                imgSrcOriginal = "https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787__480.png";
            }
            
            let showTitle = null;
            if(!show.name) continue;
            showTitle = show.name;

            let network = "-";
            if(show.network) network = show.network.name;

            let officialSite = "-"
            if(show.officialSite) officialSite = show.officialSite;

            let premiered = "-"
            if(show.premiered) premiered = show.premiered;

            let summary = show.summary;
            summary = `
                <p>Show: ${showTitle} </p>
                <p>Date: ${premiered} </p>
                <p>Network: ${network} </p>
                <br>
            ` + summary;

            allBoxesHtml += this.getShowBoxByTemplate(imgSrc, showTitle, genres, summary);
        }

        this.showsDataSection.innerHTML = allBoxesHtml;
    },

    getShowBoxByTemplate: function(imgSrc, title, genres, overview){
        return `
        <div class="show-box">
                <img src="${imgSrc}" alt="">
                <div class="show-title">${title}</div>
                <div class="show-genres">${genres}</div>
                <div class="show-overview">${overview}</div>
            </div>
        `
    }
};