const errorObject = (errors) => {
  if(typeof errors === 'object'){
    for (const item in errors) {
        if(typeof (errors[item]) === 'object'){
            for (const error in errors[item]) {
              this.$toast.add({severity:'error', detail:errors[item][error], life:300, group: 'br'});
            }
        }else{
          this.$toast.add({severity:'error', detail:errors[item], life:300, group: 'br'});
        }
    }
  }else{
    this.$toast.error(errors);
  }
}



export {errorObject}
