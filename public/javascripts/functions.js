function getAction() {
    return 'convert';
}

function generateTextField(name, description, def) {
    return `<input type="text" class="form-control" id="input_${name}" placeholder="${description}" value="${def}"></input>`;
}

function generateSelectField(name, description, options, def) {
    let fieldHtml = `<select class="form-control" id="input_${name}">`;
    
    $.each(options, function(index, option) {
        fieldHtml += `<option value="${option}">${option.toLowerCase()}</option>`;
    });
    
    fieldHtml += '</select>';
    
    return fieldHtml;
}

function generateFieldHtml(field, options) {   
    fieldHtml = '';

    switch (options.type) {
        case 'text':
            fieldHtml += generateTextField(field, options.description, options.default);
            break;
        case 'select':
            fieldHtml += generateSelectField(field, options.description, options.options, options.default);
            break;

        default:
            fieldHtml = '';
            break;
    }
    
    return `<div class="col-4 mb-3"><label for="input_${field}" class="form-label">${options.description}</label>${fieldHtml}</div>`;;
}

function generateCommand(action, inputs) {
    let command = `ffmpeg -y -i "input.ext" `;
    
    switch (action) {
        case 'convert':
            command += `-c:v ${inputs.vcodec} -c:a ${inputs.acodec} -b:v ${inputs.vbitrate} -b:a ${inputs.abitrate} -preset ${inputs.preset} -f ${inputs.output_format} -s ${inputs.output_resolution} -ss ${inputs.start_time} -to ${inputs.end_time} "${inputs.output_filename}"`;
            break;
        case 'flip':
            command += `-vf "hflip" -c:v ${inputs.vcodec} -c:a ${inputs.acodec} -b:v ${inputs.vbitrate} -b:a ${inputs.abitrate} -preset ${inputs.preset} -f ${inputs.output_format} -s ${inputs.output_resolution} -ss ${inputs.start_time} -to ${inputs.end_time} "${inputs.output_filename}"`;
            break;
        default:
            command = '';
            break;
    }

    return command;
}