<template>
  <div class="w-full h-full relative">
    <div id="{{ playerID }}" ref="vPlayer" class="w-full h-full"></div>
  </div>
</template>

<script>
import Player from '@/server/config/player'
import { contentStore } from '@/stores/contentStore';
import { siteStore } from '@/stores/SiteStore';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'GlobalPlayer',
  props: {
    content: {
      String,
      required: true
    },
  },
  data() {
    return {
      playerID: 'g_player',
      contentData: null,
      playerType: null,
      playURL: null,
      absPlayer:null
    }
  },
  methods: {
    ...mapActions(contentStore,{trailer:'getTrailer'}),
    openVideo() {
      this.absPlayer = Player({
        id: this.$refs.vPlayer.id,
        src: this.playURL,
        poster: this.$props.content?.poster,
        encrypt: false,
        api_key: this.playerData.api_key ?? 'c28zb2llcXVkZWFyb3I3N2xkZWlnNzBmdWFsMDZodDZj',
        background: 'darkblue',
        share: true,
        pip: false,
        subtitle: false,
        autoplay:false,
        analytics: {
          tag: this.playerData.tag ?? 'G-FKJ9WK8CE5',
          appName: this.playerData.app_name ?? 'abs-video-player'
        },
        loader: [2, '#fff'],
        logo: {
          url: this.playerData.logo ?? "https://abdursoft.com/assets/images/logo/abdursoft-f.svg",
          position: {
            position: "absolute",
            width: '70px',
            height: '65px',
            top: "20px",
            right: "20px",
            zIndex: 4,
            borderRadius: "50%",
            overflow: "hidden"
          }
        },
        snap: 'no',
        snapIcon: false,
        iconHoverColor: this.playerData.button_highlight ?? "rgba(36, 107, 173, 0.88)",
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
          background: this.playerData.duration_highlight ?? 'indigo',
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
            right: '18px',
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
          background: this.playerData.duration_highlight ?? 'indigo',
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
          left: ['playPauseControl', 'durationArea'],
          right: ['volumeControl', 'screenControl'],
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)"
        },
        contextMenu: this.playerData.context_menu ?? true,
        lang: this.playerData.language ?? this.lang,
        tooltip: this.playerData.tooltip ?? true,
      });

      this.absPlayer.pause();
    },
    async getURL(){
      const res = await this.trailer(this.$props.content.id);
      if(res.status === 200){
        this.playURL = res.data.trailer;
        this.openVideo();
      }
    },
    getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  computed: {
    ...mapState(siteStore, ['playerData']),
  },
  created() {
    this.playerID = 'g_player_'+this.getRandomNumber(1000,999999);
  },
  mounted(){
    this.getURL();
  }
}
</script>
