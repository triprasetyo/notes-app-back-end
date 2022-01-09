const {nanoid} = require('nanoid');
const notes = require('./notes');

// eslint-disable-next-line no-unused-vars
const addNoteHandler = (request,h)=> {
    const {title, tags, body}  = request.payload;

    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newNote = {
        title, tags, body, id, createAt, updateAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            error:false,
            message:'Catatan berhasil ditambahkan',
            data:{
                noteId:id,
            }
        });
        response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
        return response;
    }

    const response = h.response({
        status:'fail',
        message:'Catatan gagal ditambahkan',
    });
    response.code(201);
    return response;
};

const getAllNotesHandler = () => ({
    status:'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h)=>{
    const {id} = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if(note !== undefined){
        return{
            status:'success',
            data:{
                note,
            },
        };
    }

    const response = h.response({
        status:'fail',
        message:'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {addNoteHandler,getAllNotesHandler, getNoteByIdHandler};