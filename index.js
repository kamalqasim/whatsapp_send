const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log('Client is ready!');

    const number = [
        "number", 
    ];
    number.forEach(async val  => {
        const sanitized_number = val.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
        const final_number = `994${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
    
        const number_details = await client.getNumberId(final_number); // get mobile number details
    
        if (number_details) {
            const sendMessageData = await client.sendMessage(number_details._serialized, 'Respublika bank size faydali'); // send message
        } else {
            console.log(final_number, "Mobile number is not registered");
        }
    });
    

});

client.initialize();
