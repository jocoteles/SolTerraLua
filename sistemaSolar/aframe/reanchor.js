AFRAME.registerComponent('reanchor', {

    schema: {
      anchoredEl: { type: 'selector', default: '[anchored]' }
    },
  
    init() {      
        this.bindMethods();
        this.el.addEventListener('click', this.onClick)  
    },
  
    onClick: function (evt) {

        var targetEl = evt.target;
  
        const el = this.data.anchoredEl
        const anchoredComponent = el.components['anchored']

        anchoredComponent.reAnchor();      
        console.log('REancorado!');
            
        if (targetEl === document.getElementById("anchorButton")) {
            anchoredComponent.reAnchor();      
            console.log('REancorado!');
        }
    },

    bindMethods: function () {
        this.onClick = this.onClick.bind(this);
      }
  })