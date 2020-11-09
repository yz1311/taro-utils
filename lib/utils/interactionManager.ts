

const InteractionManager = {
    runAfterInteractions: (task?: ()=>void) => {
        setTimeout(()=>{
            task&&task();
        }, 150);
    }
};


export default InteractionManager;
