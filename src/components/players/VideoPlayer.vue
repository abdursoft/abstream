<template>
  <div class="w-full h-auto mb-2 md:pb-[80px]">
    <div class="h-[320px] md:h-[580px] bg-slate-800 flex items-center justify-center flex-col gap-4"
      v-if="$props.content?.premium == '1' && subscription == '0'">
      <h2 class="text-2xl text-white text-center">{{ $t('subscriptionToWatch') }}</h2>
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
import Player from '@/server/config/player'
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
    types: {
      String,
      default: "content"
    }
  },
  data() {
    return {
      isPlayer: null,
      contentData: null,
      playerType: null
    }
  },
  methods: {
    ...mapActions(commentStore, { getComment: 'getComments' }),
    ...mapActions(siteStore, { setPlayer: 'setPlayer' }),
    ...mapActions(contentStore, { playContent: 'playVideo' }),
    hello() {
      console.log('Hello vue')
    },
    async openVideo() {
      if (this.$props.content?.premium != "1" && this.$props.content) {
        await this.playVideo();
      }else if(this.$props.content?.premium == "1" && this.subscription >= 1){
        await this.playVideo();
      }else{
        if(this.$props.content?.premium == '1' && this.subscription == 0){
          this.setPlayer(false);
        }
      }
      window.scrollTo(0, 0);
    },
    async playVideo(){
      const content = await this.playContent(this.$props.content?.id, this.$props.types);
        if (this.player && this.isPlayer && content) {
          this.isPlayer.new(content,this.$props.content?.title);
        }else if (content && (!this.player || !this.isPlayer)) {
          this.isPlayer = Player({
            id: 'player',
            src: content,
            poster: this.$props.content?.poster,
            encrypt: false,
            api_key: this.playerData.api_key ?? 'c28zb2llcXVkZWFyb3I3N2xkZWlnNzBmdWFsMDZodDZj',
            background: 'darkblue',
            playback: {
              speed: [0.5, 1, 1.5, 2],
              default: 1,
              placement: {
                content: "x",
              }
            },
            share: true,
            pip: false,
            subtitle: false,
            analytics: {
              tag: this.playerData.tag ?? 'G-FKJ9WK8CE5',
              appName: this.playerData.app_name ?? 'abs-video-player'
            },
            loader:[2,'#fff'],
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
              left: ['playPauseControl', 'speedPlacement', 'forwardControl', 'durationArea'],
              right: ['castControl', 'settingsControl', 'volumeControl', 'screenControl'],
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)"
            },
            contextMenu: this.playerData.context_menu ?? true,
            lang: this.playerData.language ?? this.lang,
            tooltip: this.playerData.tooltip ?? true,
            title: this.$props.content?.title,
            topControls:{
                back:true,
                title:true
            }
          });
          this.setPlayer(this.isPlayer);
        }
        if (this.nextContent && this.player) {
          this.player.next(playNext());
        }
        document.title = this.$props.content?.title;
        this.getComment(this.$props.content?.id);
    }
  },
  computed: {
    ...mapState(authStore, ['user', 'subscription']),
    ...mapState(siteStore, ['nextContent','player','playerData','lang']),
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
  }
}
</script>
