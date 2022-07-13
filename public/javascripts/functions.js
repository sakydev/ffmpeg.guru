function getAction() {
    return 'convert';
}

function getSkeleton() {
    let json = '{"fields":{"vcodec":{"type":"select","description":"Output video codec","options":["copy","h264","h265"],"default":"copy","in_defaults":true},"acodec":{"type":"select","description":"Output audio codec","options":["copy","aac","mp3","libamp","libmp3lame","libfdk_aac","libopus"],"default":"copy","in_defaults":true},"vbitrate":{"type":"select","description":"Output video bitrate","options":["copy","400kbps","800kbps","1200kbps","1500kbps","4000kbps","8000kbps"],"default":"copy","in_defaults":true},"abitrate":{"type":"select","description":"Output audio bitrate","options":["copy","64kbps","96kbps","128kbps","192kbps","320kbps"],"default":"same","in_defaults":true},"preset":{"type":"select","description":"Ffmpeg processing preset","options":["ultrafast","superfast","veryfast","faster","fast","medium","slow","slower","veryslow","placebo"],"default":"fast","in_defaults":true},"output_format":{"type":"select","description":"Output file format","options":["mp4","mkv","webm","flv","avi","mov","wmv","mpg","mpeg"],"default":"mp4","in_defaults":true},"output_filename":{"type":"text","description":"Output filename","default":"output.mp4","in_defaults":true},"output_resolution":{"type":"select","description":"Output video resolution","options":["copy","240p","360p","480p","720p","1080p","2160p"],"default":"copy","in_defaults":false},"start_time":{"type":"text","description":"Starting point of video","default":"00:00:00","in_defaults":false},"end_time":{"type":"text","description":"Ending point of video","default":"00:00:00","in_defaults":false}},"actions":{"convert":{"description":"Convert video from one format to another","required":["{{__defaults__}}","output_format","output_resolution","start_time","end_time"]},"flip":{"description":"Flip video vertically or horizontally","required":["output_format","output_resolution","start_time","end_time"]},"split":{},"trim":{},"vspeed":{},"aspeed":{},"volume":{},"resize":{},"mute":{},"captions":{},"greyscale":{},"reverse":{},"rotate":{},"merge":{},"sprite":{},"thumbnail":{},"gif":{},"grid":{},"text":{},"blur":{},"loop":{},"watermark":{},"audio_track":{},"from_image":{},"from_images":{},"extract_audio":{},"extract_join":{},"split_screen":{},"colour_effect":{}}}';
    
    return JSON.parse(json);
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