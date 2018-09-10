module.exports = function MakeValkRagObvious(dispatch) {	

    const RagnarokId = 10155130;
    const GROW_ID = 7000005;
    const stack = 10;
    const duration = 30000;

     dispatch.hook('S_ABNORMALITY_BEGIN', 2, event => {
        if (event.id == RagnarokId) {
            applyChange(event.target, GROW_ID);
        }
     })

     dispatch.hook('S_ABNORMALITY_END', 1, event => {
        if (event.id == RagnarokId) {
            removeChange(event.target, GROW_ID);
        }
     })

     
    function applyChange (target, id){
        //console.log('applying');
        
        dispatch.toClient('S_ABNORMALITY_END', 1, {
                    target: target,
                    id: id,
                });	
        dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
                    target: target,
                    source: target,
                    id: id,
                    duration: duration,
                    unk: 0,
                    stacks: stack,
                    unk2: 0,
                });
    }
    
    function removeChange (target, id){
        //console.log('removing');

        dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
                    target: target,
                    source: target,                      
                    id: id,                      	  //Sometimes abnormality disappears and needs to be restored before removing.
                    duration: duration,			  //This makes sure u can restore your appearance and no abnormality icon is left in your buff bar.
                    unk: 0,
                    stacks: stack,
                    unk2: 0,
                });
        dispatch.toClient('S_ABNORMALITY_END', 1, {
                    target: target,
                    id: id,
                });	
	}
    
        
}
