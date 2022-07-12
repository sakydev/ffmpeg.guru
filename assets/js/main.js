$(document).ready(function() {
    const action = getAction();
    const skeleton = getSkeleton();
    const defaultplaceholder = '{{__defaults__}}'
    
    const defaults = Object.keys(skeleton.fields).map(function(key) {
        return skeleton.fields[key]['in_defaults'] == true ? key : null;  
    }).filter(n => n);

    $.each(skeleton.actions, function(index, actionOptions) {
        if (actionOptions.required !== undefined) {
            $('#action').append('<option value="' + index + '">' + actionOptions.description + '</option>');
        }
    });

    $('#action').on('change', function() {
        $('#fields').empty();
        
        $.each(skeleton.actions[$(this).val()].required, function(index, field) {
            if (field == defaultplaceholder) {
                // $('#fields').append()
            } else {
                $('#fields').append(generateFieldHtml(field, skeleton.fields[field]));
            }
        });

    });
})