$(document).ready(function() {
    // set up event handlers
    $("#addItem").on('click', function() {
        addItemToList();
    })
    $("#newItem").on('keypress', function(evt) {
       if (evt.keyCode == 13) {
            addItemToList();   
       };    
    });

});
// This function adss the item in the box to the grocerylist.
function addItemToList() {

    // get the <input> element with id "newItem"
    var $inputEl = $("#newItem");

    // get the value of that element (whatever is typed
    // in the box)
    var item = $inputEl.val();
    
    if (checkForUnique(item)) {
    
        var $newItem = $("<li></li>");
        $newItem.append("<span>" +  item + "</span>");
        var $editButton = $("<button class='editButton'>Edit</button>");
        $newItem.append($editButton);

        
        $("#grocerylist").append($newItem);
        $editButton.on("click",function() {
            $(this).hide();
            $(this).parent().find("span").hide();
            $(this).parent().append('<input type="text" class="editField" value="' +     $(this).parent().find("span").html() + '">');
            $(this).parent().append('<button class="saveButton">Save</button>');
            
            
            $(".saveButton").on("click",function() {
                 var newText = $(this).parent().find(".editField").val();
                if (checkForUnique(newText)) {
                    $(this).parent().find("span").html(newText);
                    $(this).parent().find(".editField").remove();
                    $(this).parent().find("span").show();
                    $(this).parent().find(".editButton").show();
                    $(this).remove();
                } else {
                    alert("This item is a duplicate.");   
                }
            });
        });
        
        


    } else {
        alert("This item is a duplicate.");
    }
    
    // Clear out the box:
    $inputEl.val("");
    
    // Give the box focus
    $inputEl.focus();
}

function checkForUnique(listItem) {
    var found = false;
    // console.log ("Running checkForUnique on [" + listItem + "]");
    $("#grocerylist li span").each(function() {
        
        // console.log ("Comparing with [" + $(this).html() + "]");   
        if (listItem == $(this).html()) {
            // alert ("I found one.");
            found=true;   
        }
    });
    if (found) {
        return false;
    } else {
        return true;
    }
}

/*
TODO:
    - DONE enter key doesn't work
    - can't delete items or reorder them or edit them
    - DONE last item stays in the box after being added to the list
    - DONE box doesn't get focus after adding item
    - can add blank items
    - DONE can add duplicates
    - would be easier in jQuery
*/