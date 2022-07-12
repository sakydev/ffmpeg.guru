$(document).ready(function() {
    const action = getAction();
    const skeleton = getSkeleton();
    const defaultplaceholder = '{{__defaults__}}';
    let requiredFields = [];
    
    // filter out defaults from list of fields
    const defaults = Object.keys(skeleton.fields).map(function(key) {
        return skeleton.fields[key]['in_defaults'] == true ? key : null;  
    }).filter(n => n);

    // create initial dropdown to select action
    $.each(skeleton.actions, function(index, actionOptions) {
        if (actionOptions.required !== undefined) {
            $('#action').append(`<option value="${index}">${actionOptions.description}</option>`);
        }
    });

    // Generate fields
    $('#action').on('change', function() {
        $('#fields').empty();
        requiredFields = skeleton.actions[$(this).val()].required;
        
        if (requiredFields.includes(defaultplaceholder)) {
            // remove __defaults__ place holder and 
            // merge defaults array into requiredFields array
            requiredFields.splice(requiredFields.indexOf(defaultplaceholder), 1);
            requiredFields = requiredFields.concat(defaults);
        }

        $.each(requiredFields, function(index, field) {
            fieldHtml = generateFieldHtml(field, skeleton.fields[field]);
            $('#fields').append(fieldHtml);
        });

    });

    // generate ffmpeg command
    $('#generate').on('click', function(e) {
        e.preventDefault();
        
        const userInputs = {}
        requiredFields.map(function(key) {
            userInputs[key] = $('#input_' + key).val();
        });
        
        $('#command').html('').html(generateCommand(action, userInputs)).fadeIn('slow');
    });
})