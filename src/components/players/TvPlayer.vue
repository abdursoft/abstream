<template>
  <div class="w-full h-auto mb-2 md:pb-[80px]">
    <div class="h-[320px] md:h-[720px] bg-slate-800 flex items-center justify-center flex-col gap-4"
      v-if="tvContent?.premium === '1' && subscription === '0'">
      <h2 class="text-2xl text-white">{{ $t('subscriptionToWatch') }}</h2>
      <Button severity="danger" :label="$t('menu.subscribe')" as="router-link" :to="{ name: 'subscribe' }" />
    </div>
    <!-- subscription required end  -->
     <!-- tv player start  -->
    <div id="player" v-else class="w-full md:max-h-[720px]" :class="liveURL ? 'bg-slate-800' : ''">
    </div>
    <!-- tv player end  -->
    <div class="flex items-center justify-between my-2">
      <div class="w-full md:w-3/4">
        <h2 class="text-3xl font-bold line-clamp-1">{{ tvContent?.title }}</h2>
      </div>
    </div>
    <related-tv />
    <others-tv />
  </div>
</template>

<script>
import Player from 'https://cdn.abdursoft.com/video/beta.js'
import { mapActions, mapState } from 'pinia';
import { authStore } from '@/stores/authStore';
import { tvStore } from '@/stores/tvStore';
import RelatedTv from '../partials/RelatedTv.vue';
import OthersTv from '../partials/OthersTv.vue';
export default {
  components: { RelatedTv, OthersTv },
  name: 'TvPlayer',
  props:{
    tvContent:{
      Object,
      required:true
    }
  },
  data() {
    return {
      isPlayer: false,
      liveURL:null,
      tv:null
    }
  },
  methods:{
    ...mapActions(tvStore, {playTv:'playTv'}),
    async openTV(){
      if (this.tv?.premium !== "1" || this.subscription !== "0" && this.$props.tvContent) {
        this.liveURL = await this.playTv(this.$props.tvContent?.id);

      if (this.isPlayer && this.liveURL) {
        this.isPlayer.new(this.liveURL);
      }
      if (this.liveURL && this.isPlayer === false) {
        this.isPlayer = Player({
          id: 'player',
          src: this.liveURL,
          poster: this.tv?.logo,
          encrypt: false,
          api_key: 'c28zb2llcXVkZWFyb3I3N2xkZWlnNzBmdWFsMDZodDZj',
          background: 'darkblue',
          playback: {
            speed: [0.5, 1, 1.5, 2],
            default: 1,
            placement: {
              content: "x",
            }
          },
          backward: true,
          forward: true,
          share: true,
          pip: true,
          subtitle: ['https://cdn.bitmovin.com/tv/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt'],
          analytics: {
            tag: 'G-FKJ9WK8CE5',
            appName: 'Live-radio'
          },
          logo: {
            url: "https://abdursoft.com/assets/images/logo/abdursoft-f.svg",
            position: {
              position: "absolute",
              width: '70px',
              height: '65px',
              top: "10px",
              right: "30px",
              zIndex: 4,
              borderRadius: "50%",
              overflow: "hidden"
            }
          },
          snap: 'no',
          vast: false,
          snapIcon: false,
          iconHoverColor: "rgba(36, 107, 173, 0.88)",
          progress: {
            css: {
              width: "98%",
              height: "5px",
              position: "absolute",
              bottom: "50px",
              background: "#f9f9f9",
              left: '1%',
              right: '1%',
              zIndex: 5,
              borderRadius: '4px',
              cursor: "pointer",
              overflow: 'hidden',
              transition: "all 0.3s"
            },
            defaultHeight: "5px",
            extendHeight: "8px"
          },
          progressTimeline: {
            position: 'absolute',
            width: 0,
            height: '100%',
            top: 0,
            left: 0,
            background: 'indigo',
            cursor: 'pointer'
          },
          volumeContainer: {
            css: {
              width: '110px',
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              justifyContent: "center",
              bottom: '118px',
              left: '20px',
              padding: '8px 10px',
              zIndex: 5,
              background: "rgba(0,0,0,0.5)",
              transform: "rotate(-90deg)",
              borderRadius: "5px"
            },
            type: 'vertical'
          },
          volumeSliderArea: {
            width: '100%',
            height: '15px',
            background: 'gray',
            cursor: 'pointer',
            transition: '0.5s',
            position: 'relative',
          },
          volumeSlider: {
            width: '0px',
            height: '15px',
            background: 'indigo',
            cursor: 'pointer',
            transition: '0.5s',
            position: 'absolute'
          },
          durationArea: {
            css: {
              display: 'flex',
              zIndex: 2,
              alignItems: 'center',
              gap: "5px",
            },
            divider: {
              content: "/",
              css: {
                fontSize: "13px",
                color: "#fff",
                fontWeight: "bold",
                marginBottom: "0px",
                paddingBottom: "0px"
              }
            },
          },
          controls: {
            left: ['playPauseControl', 'volumeControl','durationArea'],
            right: ['castControl', 'shareControl',  'settingsControl', 'screenControl'],
            background: "rgba(0,0,0,0.3)"
          },
          contextMenu: true,
          lang: "EN",
          tooltip: true
          // vast: 'https://crickbd.live/vast/ads/?.xml'
        })
      }
      document.title = this.tv?.title;
    } else {
      this.isPlayer = false;
    }
    }
  },
  computed: {
    ...mapState(authStore, ['user', 'subscription']),
  },
  watch:{
    '$props.tvContent':{
      handler(data){
        if(data?.id !== this.tv?.id){
          this.tv = data;
          this.openTV();
        }
      }
    }
  },
  created() {
    window.scrollTo(0, 1000);
  }
}
</script>
