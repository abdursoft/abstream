<template>
  <div class="w-full h-auto mb-2 md:pb-[80px]">
    <div class="h-[320px] md:h-[720px] bg-slate-800 flex items-center justify-center flex-col gap-4"
      v-if="$props.content?.premium === '1' && subscription === '0'">
      <h2 class="text-2xl text-white">{{ $t('subscriptionToWatch') }}</h2>
      <Button severity="danger" :label="$t('menu.subscribe')" as="router-link" :to="{ name: 'subscribe' }" />
    </div>
    <div id="player" v-else class="w-full" :class="content?.content_url ? 'h-[320px] md:h-[660px] bg-slate-800' : ''">
    </div>
    <content-title :types="$props.types" />
    <content-details :contentID="$props.content?.id" :types="$props.types" />
    <comment-post v-if="types == 'content'" />
    <comment-view v-if="types == 'content'" />
  </div>
</template>

<script>
import Player from 'https://cdn.abdursoft.com/video/beta.js'
import ContentTitle from '../content/ContentTitle.vue'
import CommentPost from '../comments/CommentPost.vue'
import CommentView from '../comments/CommentView.vue'
import { mapActions, mapState } from 'pinia';
import { commentStore } from '@/stores/commentStore';
import { authStore } from '@/stores/authStore';
import ContentDetails from '../content/ContentDetails.vue';
import { siteStore } from '@/stores/SiteStore';
import { contentStore } from '@/stores/contentStore';

function playNext() {
  console.log('Playing next')
}

export default {
  components: { ContentTitle, CommentPost, CommentView, ContentDetails },
  name: 'VideoPlayer',
  props: {
    content: {
      Object,
      required: true
    },
    types:{
      String,
      default: "content"
    }
  },
  data() {
    return {
      isPlayer: false,
      contentData: null,
      playerType:null
    }
  },
  methods: {
    ...mapActions(commentStore, { getComment: 'getComments' }),
    ...mapActions(siteStore, { setPlayer: 'setPlayer' }),
    ...mapActions(contentStore,{playContent: 'playVideo'}),
    hello() {
      console.log('Hello vue')
    },
    async openVideo() {
      if (this.$props.content?.premium !== "1" || this.subscription !== "0" && this.$props.content) {
        const content = await this.playContent(this.$props.content?.id,this.$props.types);
        if (this.isPlayer && content) {
          this.isPlayer.new(content);
        }
        if (content && this.isPlayer === false) {
          this.isPlayer = Player({
            id: 'player',
            src: content,
            poster: this.$props.content?.poster,
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
            subtitle: ['https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt'],
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
                right: '60px',
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
              left: ['playPauseControl', 'backwardControl', 'speedPlacement', 'forwardControl', 'durationArea'],
              right: ['castControl', 'shareControl', 'volumeControl', 'settingsControl', 'screenControl'],
              background: "rgba(0,0,0,0.3)"
            },
            contextMenu: true,
            lang: "EN",
            tooltip: true
            // vast: 'https://crickbd.live/vast/ads/?.xml'
          })
        }
        if (this.nextContent && this.isPlayer) {
          this.isPlayer.next(playNext());
        }
        document.title = this.$props.content?.title;
        this.getComment(this.$props.content?.id);
      } else {
        this.isPlayer = false;
      }
      this.setPlayer(this.isPlayer);
    }
  },
  computed: {
    ...mapState(authStore, ['user', 'subscription']),
    ...mapState(siteStore, ['nextContent'])
  },
  watch: {
    "$props.content": {
      handler(data) {
        if (data?.id !== this.contentData?.id) {
          this.contentData = data;
          this.openVideo();
        }
      }
    },
  },
  created() {
    this.contentData = this.$props.content;
    window.scrollTo(0, 1000);
  }
}
</script>
