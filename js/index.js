// [ Data ]

let slides = [{
    id: 0,
    name: 'Dataless Network',
    content: 'Fist fighting'
  },
  {
    id: 1,
    name: 'Overview',
    content: 'Laser eyes'
  },
  {
    id: 2,
    name: 'Functionality',
    content: 'Too fast'
  },
  {
    id: 3,
    name: 'Implementation',
    content: 'Just a nice guy'
  },
  {
    id: 4,
    name: 'Team',
    content: 'SMASH!'
  }
];

// [ Components ]

let SlidesList = Vue.extend({
  template: '#slides-list',
  data: function () {
    return {
      slides
    }
  },
  computed: {
    filteredSlides: function () {
      return this.slides;
    }
  }
});

let Slide = Vue.extend({
  template: '#slide',
  data: function () {
    return {
      slide: findSlide(this.$route.params.slide_id)
    }
  }
});

let SlideAdd = Vue.extend({
  template: '#slide-add',
  data: function () {
    return {
      slide: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    createSlide: function () {
      let slide = this.slide;
      slides.push({
        id: getNextId(),
        name: slide.name,
        content: slide.content
      });
      router.push('/');
    }
  }
});

let SlideEdit = Vue.extend({
  template: '#slide-edit',
  data: function () {
    return {
      slide: findSlide(this.$route.params.slide_id)
    };
  },
  methods: {
    updateSlide: function () {
      let slide = this.slide;
      slides[findSlideKey(slide.id)] = {
        id: slide.id,
        name: slide.name,
        content: slide.content
      }
      router.push('/');
    }
  }
});

let SlideDelete = Vue.extend({
  template: '#slide-delete',
  data: function () {
    return {
      slide: findSlide(this.$route.params.slide_id)
    };
  },
  methods: {
    deleteSlide: function () {
      slides.splice(findSlideKey(this.$route.params.slide_id), 1);
      router.push('/');
    }
  }
});
// [ Database connectors ]

function findSlide(id) {
  for (let i = 0; i < slides.length; ++i) {
    if (slides[i].id === id) return slides[i];
  }
}

function findSlideKey(id) {
  for (let i = 0; i < slides.length; ++i) {
    if (slides[i].id === id) return i;
  }
}

function getNextId() {
  return (slides[slides.length - 1].id + 1);
}

// [ App + Router ]

let router = new VueRouter({
  routes: [{
      path: '/',
      component: SlidesList
    }, // Slides list
    {
      path: '/slide/:slide_id',
      component: Slide,
      name: 'slide'
    }, // Slide details
    {
      path: '/slide-add',
      component: SlideAdd
    }, // Add new slide
    {
      path: '/slide/:slide_id/edit',
      component: SlideEdit,
      name: 'slide-edit'
    }, // Edit slide
    {
      path: '/slide/:slide_id/delete',
      component: SlideDelete,
      name: 'slide-delete'
    }, // Delete slide
  ]
});

let vm = new Vue({
  router
}).$mount('#app');

// SlideShow Functionality

function downloadSlides() {

}