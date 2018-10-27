//Javascript is connected 
$(document).ready(function () {

    // //function comingSoon(){
    // document.getElementById("btnSearch").innerHTML =  alert(" Coming Soon" );
    // }

    //Initial array of Gif Search 
    var images = ['fight', 'dog', 'congratulation'];

    //Generic Function for capturing the image name from the data-attribute
    function displayGifInfo() {

        var gifName = $(this).data("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=0Zl1CfpgBLx6in8X7jiy2lSywzXmwAhl&q="+images+"&limit=10";
        console.log(queryURL);
        //alert(gifName);
        //var apiKey = "0Zl1CfpgBLx6in8X7jiy2lSywzXmwAhl"
        // console.log(queryURL);
        //Creating an Ajax Call for the specific gif search 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //console.log(response);
            var output = response.data;
            // Create a variable storing Rating Information

            for (var i = 0; i < output.length; i++ ){
            //Create a div to hold the images 
            var imageDiv = $("<div class='imgDiv'>");


            // Retrieving the img still image 
            var stillImg = response.data[i].images.fixed_height_still.url;
            console.log(stillImg)

            //Retrieving the URL for the GIFImage
            var imgURL = response.data[i].images.fixed_height.url;
            console.log(imgURL);

            //creating an element to hold the image 
            var gifImgFound = $("<img>").attr("src", stillImg);

            //Appending the image 
            imageDiv.append(gifImgFound);

            // Create a variable Rate to store the value of Rating 
            var rate = response.data[i].rating;
            console.log(rate);
            
            //Creating an element to have rating
            var rP = $("<p>").text("Rating: " + rate);
            //console.log(rP)
            imageDiv.append(rP);

            //Putting the entire image above the previous gif 
            $("#gif-views").prepend(imageDiv);
            }

        });
    }


        //Function for displaying image data 

        function gifSearchbtnRender() {

            //Deleting the image search
            $("#gifBtn-view").empty();

            //Looping through the array of image

            for (var i = 0; i < images.length; i++) {


                //Dynamically Generate Buttons for each gif 
                var b = $("<button>");
                //add class .btnImg on above button 
                b.addClass("btnImg");
                // adding a data-attribute
                b.attr("data-name", images[i]);
                //providing the initial button text 
                b.text(images[i]);
                //Adding the button to the HTML 
                $("#gifBtn-view").append(b);
            }
        }

        // This Function handles events where a Search Button is clicked 
        $("#gSearchBtn").on("click", function (event) {

            //Below code prevents to refresh when pressed enter   
            event.preventDefault();

          
            //alert("Btn Clicked");
            //This Line grabs the input from textbox
            var inputImage = $("#inputSearch").val().trim();

            if (inputImage === " ") {

                $("#inputSearch").focus();

            }
              else {

            //Adding Image Text from the textbox to our array 
            images.push(inputImage);

            //Calling gifSearchbtnRender which handles the processing of our gif image array 
            gifSearchbtnRender();

              }

        });
        //adding a click event listener to all the elements with a class of btnImg
        //gifSearch();
        $(document).on("click", ".btnImg", displayGifInfo);

        // Calling the GifSearchBtnRender function to display the intial buttons 
        gifSearchbtnRender(); 
})