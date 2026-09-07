(() => {
  "use strict";

  const BUILD_ID = "0.7.9";

  if (window.__startabDexBuild === BUILD_ID) return;
  window.__startabDexBuild = BUILD_ID;

  const isEmulatorRoute = () =>
    /(?:^|\/)(?:season_\d+\/)?(?:emulator|emulator_play)(?:\/|$)/i.test(location.pathname) ||
    !!window.__celarysEmuModule ||
    !!window.celarysEmuModule;

  const PARTY_DELTA = 0x258;
  const PARTY_SIZE = 100;
  const PARTY_SLOTS = 6;
  const POLL_MS = 250;
  const STORAGE_KEY = "startab_dex_overlay_v3";

  const MOVE_DB = {"1":{"name":"POUND","category":"Physical"},"2":{"name":"KARATE CHOP","category":"Physical"},"3":{"name":"DOUBLE SLAP","category":"Physical"},"4":{"name":"COMET PUNCH","category":"Physical"},"5":{"name":"MEGA PUNCH","category":"Physical"},"6":{"name":"PAY DAY","category":"Physical"},"7":{"name":"FIRE PUNCH","category":"Physical"},"8":{"name":"ICE PUNCH","category":"Physical"},"9":{"name":"THUNDER PUNCH","category":"Physical"},"10":{"name":"SCRATCH","category":"Physical"},"11":{"name":"VISE GRIP","category":"Physical"},"12":{"name":"GUILLOTINE","category":"Physical"},"13":{"name":"RAZOR WIND","category":"Special"},"14":{"name":"SWORDS DANCE","category":"Status"},"15":{"name":"CUT","category":"Physical"},"16":{"name":"GUST","category":"Special"},"17":{"name":"WING ATTACK","category":"Physical"},"18":{"name":"WHIRLWIND","category":"Status"},"19":{"name":"FLY","category":"Physical"},"20":{"name":"BIND","category":"Physical"},"21":{"name":"SLAM","category":"Physical"},"22":{"name":"VINE WHIP","category":"Physical"},"23":{"name":"STOMP","category":"Physical"},"24":{"name":"DOUBLE KICK","category":"Physical"},"25":{"name":"MEGA KICK","category":"Physical"},"26":{"name":"JUMP KICK","category":"Physical"},"27":{"name":"ROLLING KICK","category":"Physical"},"28":{"name":"SAND ATTACK","category":"Status"},"29":{"name":"HEADBUTT","category":"Physical"},"30":{"name":"HORN ATTACK","category":"Physical"},"31":{"name":"FURY ATTACK","category":"Physical"},"32":{"name":"HORN DRILL","category":"Physical"},"33":{"name":"TACKLE","category":"Physical"},"34":{"name":"BODY SLAM","category":"Physical"},"35":{"name":"WRAP","category":"Physical"},"36":{"name":"TAKE DOWN","category":"Physical"},"37":{"name":"THRASH","category":"Physical"},"38":{"name":"DOUBLE-EDGE","category":"Physical"},"39":{"name":"TAIL WHIP","category":"Status"},"40":{"name":"POISON STING","category":"Physical"},"41":{"name":"TWINEEDLE","category":"Physical"},"42":{"name":"PIN MISSILE","category":"Physical"},"43":{"name":"LEER","category":"Status"},"44":{"name":"BITE","category":"Physical"},"45":{"name":"GROWL","category":"Status"},"46":{"name":"ROAR","category":"Status"},"47":{"name":"SING","category":"Status"},"48":{"name":"SUPERSONIC","category":"Status"},"49":{"name":"SONIC BOOM","category":"Special"},"50":{"name":"DISABLE","category":"Status"},"51":{"name":"ACID","category":"Special"},"52":{"name":"EMBER","category":"Special"},"53":{"name":"FLAMETHROWER","category":"Special"},"54":{"name":"MIST","category":"Status"},"55":{"name":"WATER GUN","category":"Special"},"56":{"name":"HYDRO PUMP","category":"Special"},"57":{"name":"SURF","category":"Special"},"58":{"name":"ICE BEAM","category":"Special"},"59":{"name":"BLIZZARD","category":"Special"},"60":{"name":"PSYBEAM","category":"Special"},"61":{"name":"BUBBLE BEAM","category":"Special"},"62":{"name":"AURORA BEAM","category":"Special"},"63":{"name":"HYPER BEAM","category":"Special"},"64":{"name":"PECK","category":"Physical"},"65":{"name":"DRILL PECK","category":"Physical"},"66":{"name":"SUBMISSION","category":"Physical"},"67":{"name":"LOW KICK","category":"Physical"},"68":{"name":"COUNTER","category":"Physical"},"69":{"name":"SEISMIC TOSS","category":"Physical"},"70":{"name":"STRENGTH","category":"Physical"},"71":{"name":"ABSORB","category":"Special"},"72":{"name":"MEGA DRAIN","category":"Special"},"73":{"name":"LEECH SEED","category":"Status"},"74":{"name":"GROWTH","category":"Status"},"75":{"name":"RAZOR LEAF","category":"Physical"},"76":{"name":"SOLAR BEAM","category":"Special"},"77":{"name":"POISON POWDER","category":"Status"},"78":{"name":"STUN SPORE","category":"Status"},"79":{"name":"SLEEP POWDER","category":"Status"},"80":{"name":"PETAL DANCE","category":"Special"},"81":{"name":"STRING SHOT","category":"Status"},"82":{"name":"DRAGON RAGE","category":"Special"},"83":{"name":"FIRE SPIN","category":"Special"},"84":{"name":"THUNDER SHOCK","category":"Special"},"85":{"name":"THUNDERBOLT","category":"Special"},"86":{"name":"THUNDER WAVE","category":"Status"},"87":{"name":"THUNDER","category":"Special"},"88":{"name":"ROCK THROW","category":"Physical"},"89":{"name":"EARTHQUAKE","category":"Physical"},"90":{"name":"FISSURE","category":"Physical"},"91":{"name":"DIG","category":"Physical"},"92":{"name":"TOXIC","category":"Status"},"93":{"name":"CONFUSION","category":"Special"},"94":{"name":"PSYCHIC","category":"Special"},"95":{"name":"HYPNOSIS","category":"Status"},"96":{"name":"MEDITATE","category":"Status"},"97":{"name":"AGILITY","category":"Status"},"98":{"name":"QUICK ATTACK","category":"Physical"},"99":{"name":"RAGE","category":"Physical"},"100":{"name":"TELEPORT","category":"Status"},"101":{"name":"NIGHT SHADE","category":"Special"},"102":{"name":"MIMIC","category":"Status"},"103":{"name":"SCREECH","category":"Status"},"104":{"name":"DOUBLE TEAM","category":"Status"},"105":{"name":"RECOVER","category":"Status"},"106":{"name":"HARDEN","category":"Status"},"107":{"name":"MINIMIZE","category":"Status"},"108":{"name":"SMOKESCREEN","category":"Status"},"109":{"name":"CONFUSE RAY","category":"Status"},"110":{"name":"WITHDRAW","category":"Status"},"111":{"name":"DEFENSE CURL","category":"Status"},"112":{"name":"BARRIER","category":"Status"},"113":{"name":"LIGHT SCREEN","category":"Status"},"114":{"name":"HAZE","category":"Status"},"115":{"name":"REFLECT","category":"Status"},"116":{"name":"FOCUS ENERGY","category":"Status"},"117":{"name":"BIDE","category":"Physical"},"118":{"name":"METRONOME","category":"Status"},"119":{"name":"MIRROR MOVE","category":"Status"},"120":{"name":"SELF-DESTRUCT","category":"Physical"},"121":{"name":"EGG BOMB","category":"Physical"},"122":{"name":"LICK","category":"Physical"},"123":{"name":"SMOG","category":"Special"},"124":{"name":"SLUDGE","category":"Special"},"125":{"name":"BONE CLUB","category":"Physical"},"126":{"name":"FIRE BLAST","category":"Special"},"127":{"name":"WATERFALL","category":"Physical"},"128":{"name":"CLAMP","category":"Physical"},"129":{"name":"SWIFT","category":"Special"},"130":{"name":"SKULL BASH","category":"Physical"},"131":{"name":"SPIKE CANNON","category":"Physical"},"132":{"name":"CONSTRICT","category":"Physical"},"133":{"name":"AMNESIA","category":"Status"},"134":{"name":"KINESIS","category":"Status"},"135":{"name":"SOFT-BOILED","category":"Status"},"136":{"name":"HIGH JUMP KICK","category":"Physical"},"137":{"name":"GLARE","category":"Status"},"138":{"name":"DREAM EATER","category":"Special"},"139":{"name":"POISON GAS","category":"Status"},"140":{"name":"BARRAGE","category":"Physical"},"141":{"name":"LEECH LIFE","category":"Physical"},"142":{"name":"LOVELY KISS","category":"Status"},"143":{"name":"SKY ATTACK","category":"Physical"},"144":{"name":"TRANSFORM","category":"Status"},"145":{"name":"BUBBLE","category":"Special"},"146":{"name":"DIZZY PUNCH","category":"Physical"},"147":{"name":"SPORE","category":"Status"},"148":{"name":"FLASH","category":"Status"},"149":{"name":"PSYWAVE","category":"Special"},"150":{"name":"SPLASH","category":"Status"},"151":{"name":"ACID ARMOR","category":"Status"},"152":{"name":"CRABHAMMER","category":"Physical"},"153":{"name":"EXPLOSION","category":"Physical"},"154":{"name":"FURY SWIPES","category":"Physical"},"155":{"name":"BONEMERANG","category":"Physical"},"156":{"name":"REST","category":"Status"},"157":{"name":"ROCK SLIDE","category":"Physical"},"158":{"name":"HYPER FANG","category":"Physical"},"159":{"name":"SHARPEN","category":"Status"},"160":{"name":"CONVERSION","category":"Status"},"161":{"name":"TRI ATTACK","category":"Special"},"162":{"name":"SUPER FANG","category":"Physical"},"163":{"name":"SLASH","category":"Physical"},"164":{"name":"SUBSTITUTE","category":"Status"},"165":{"name":"STRUGGLE","category":"Physical"},"167":{"name":"TRIPLE KICK","category":"Physical"},"168":{"name":"THIEF","category":"Physical"},"169":{"name":"SPIDER WEB","category":"Status"},"170":{"name":"MIND READER","category":"Status"},"171":{"name":"NIGHTMARE","category":"Status"},"172":{"name":"FLAME WHEEL","category":"Physical"},"173":{"name":"SNORE","category":"Special"},"174":{"name":"CURSE","category":"Status"},"175":{"name":"FLAIL","category":"Physical"},"176":{"name":"CONVERSION 2","category":"Status"},"177":{"name":"AEROBLAST","category":"Special"},"178":{"name":"COTTON SPORE","category":"Status"},"179":{"name":"REVERSAL","category":"Physical"},"180":{"name":"SPITE","category":"Status"},"181":{"name":"POWDER SNOW","category":"Special"},"182":{"name":"PROTECT","category":"Status"},"183":{"name":"MACH PUNCH","category":"Physical"},"184":{"name":"SCARY FACE","category":"Status"},"185":{"name":"FEINT ATTACK","category":"Physical"},"186":{"name":"SWEET KISS","category":"Status"},"187":{"name":"BELLY DRUM","category":"Status"},"188":{"name":"SLUDGE BOMB","category":"Special"},"189":{"name":"MUD-SLAP","category":"Special"},"190":{"name":"OCTAZOOKA","category":"Special"},"191":{"name":"SPIKES","category":"Status"},"192":{"name":"ZAP CANNON","category":"Special"},"193":{"name":"FORESIGHT","category":"Status"},"194":{"name":"DESTINY BOND","category":"Status"},"195":{"name":"PERISH SONG","category":"Status"},"196":{"name":"ICY WIND","category":"Special"},"197":{"name":"DETECT","category":"Status"},"198":{"name":"BONE RUSH","category":"Physical"},"199":{"name":"LOCK-ON","category":"Status"},"200":{"name":"OUTRAGE","category":"Physical"},"201":{"name":"SANDSTORM","category":"Status"},"202":{"name":"GIGA DRAIN","category":"Special"},"203":{"name":"ENDURE","category":"Status"},"204":{"name":"CHARM","category":"Status"},"205":{"name":"ROLLOUT","category":"Physical"},"206":{"name":"FALSE SWIPE","category":"Physical"},"207":{"name":"SWAGGER","category":"Status"},"208":{"name":"MILK DRINK","category":"Status"},"209":{"name":"SPARK","category":"Physical"},"210":{"name":"FURY CUTTER","category":"Physical"},"211":{"name":"STEEL WING","category":"Physical"},"212":{"name":"MEAN LOOK","category":"Status"},"213":{"name":"ATTRACT","category":"Status"},"214":{"name":"SLEEP TALK","category":"Status"},"215":{"name":"HEAL BELL","category":"Status"},"216":{"name":"RETURN","category":"Physical"},"217":{"name":"PRESENT","category":"Physical"},"218":{"name":"FRUSTRATION","category":"Physical"},"219":{"name":"SAFEGUARD","category":"Status"},"220":{"name":"PAIN SPLIT","category":"Status"},"221":{"name":"SACRED FIRE","category":"Physical"},"222":{"name":"MAGNITUDE","category":"Physical"},"223":{"name":"DYNAMIC PUNCH","category":"Physical"},"224":{"name":"MEGAHORN","category":"Physical"},"225":{"name":"DRAGON BREATH","category":"Special"},"226":{"name":"BATON PASS","category":"Status"},"227":{"name":"ENCORE","category":"Status"},"228":{"name":"PURSUIT","category":"Physical"},"229":{"name":"RAPID SPIN","category":"Physical"},"230":{"name":"SWEET SCENT","category":"Status"},"231":{"name":"IRON TAIL","category":"Physical"},"232":{"name":"METAL CLAW","category":"Physical"},"233":{"name":"VITAL THROW","category":"Physical"},"234":{"name":"MORNING SUN","category":"Status"},"235":{"name":"SYNTHESIS","category":"Status"},"236":{"name":"MOONLIGHT","category":"Status"},"237":{"name":"HIDDEN POWER","category":"Special"},"238":{"name":"CROSS CHOP","category":"Physical"},"239":{"name":"TWISTER","category":"Special"},"240":{"name":"RAIN DANCE","category":"Status"},"241":{"name":"SUNNY DAY","category":"Status"},"242":{"name":"CRUNCH","category":"Physical"},"243":{"name":"MIRROR COAT","category":"Special"},"244":{"name":"PSYCH UP","category":"Status"},"245":{"name":"EXTREME SPEED","category":"Physical"},"246":{"name":"ANCIENT POWER","category":"Special"},"247":{"name":"SHADOW BALL","category":"Special"},"248":{"name":"FUTURE SIGHT","category":"Special"},"249":{"name":"ROCK SMASH","category":"Physical"},"250":{"name":"WHIRLPOOL","category":"Special"},"251":{"name":"BEAT UP","category":"Physical"},"253":{"name":"UPROAR","category":"Special"},"254":{"name":"STOCKPILE","category":"Status"},"255":{"name":"SPIT UP","category":"Special"},"256":{"name":"SWALLOW","category":"Status"},"257":{"name":"HEAT WAVE","category":"Special"},"258":{"name":"HAIL","category":"Status"},"259":{"name":"TORMENT","category":"Status"},"260":{"name":"FLATTER","category":"Status"},"261":{"name":"WILL-O-WISP","category":"Status"},"262":{"name":"MEMENTO","category":"Status"},"263":{"name":"FACADE","category":"Physical"},"264":{"name":"FOCUS PUNCH","category":"Physical"},"265":{"name":"SMELLING SALTS","category":"Physical"},"266":{"name":"FOLLOW ME","category":"Status"},"267":{"name":"NATURE POWER","category":"Status"},"268":{"name":"CHARGE","category":"Status"},"269":{"name":"TAUNT","category":"Status"},"270":{"name":"HELPING HAND","category":"Status"},"271":{"name":"TRICK","category":"Status"},"272":{"name":"ROLE PLAY","category":"Status"},"273":{"name":"WISH","category":"Status"},"274":{"name":"ASSIST","category":"Status"},"275":{"name":"INGRAIN","category":"Status"},"276":{"name":"SUPERPOWER","category":"Physical"},"277":{"name":"MAGIC COAT","category":"Status"},"278":{"name":"RECYCLE","category":"Status"},"279":{"name":"REVENGE","category":"Physical"},"280":{"name":"BRICK BREAK","category":"Physical"},"281":{"name":"YAWN","category":"Status"},"282":{"name":"KNOCK OFF","category":"Physical"},"283":{"name":"ENDEAVOR","category":"Physical"},"284":{"name":"ERUPTION","category":"Special"},"285":{"name":"SKILL SWAP","category":"Status"},"286":{"name":"IMPRISON","category":"Status"},"287":{"name":"REFRESH","category":"Status"},"288":{"name":"GRUDGE","category":"Status"},"289":{"name":"SNATCH","category":"Status"},"290":{"name":"SECRET POWER","category":"Physical"},"291":{"name":"DIVE","category":"Physical"},"292":{"name":"ARM THRUST","category":"Physical"},"293":{"name":"CAMOUFLAGE","category":"Status"},"294":{"name":"TAIL GLOW","category":"Status"},"295":{"name":"LUSTER PURGE","category":"Special"},"296":{"name":"MIST BALL","category":"Special"},"297":{"name":"FEATHER DANCE","category":"Status"},"298":{"name":"TEETER DANCE","category":"Status"},"299":{"name":"BLAZE KICK","category":"Physical"},"300":{"name":"MUD SPORT","category":"Status"},"301":{"name":"ICE BALL","category":"Physical"},"302":{"name":"NEEDLE ARM","category":"Physical"},"303":{"name":"SLACK OFF","category":"Status"},"304":{"name":"HYPER VOICE","category":"Special"},"305":{"name":"POISON FANG","category":"Physical"},"306":{"name":"CRUSH CLAW","category":"Physical"},"307":{"name":"BLAST BURN","category":"Special"},"308":{"name":"HYDRO CANNON","category":"Special"},"309":{"name":"METEOR MASH","category":"Physical"},"310":{"name":"ASTONISH","category":"Physical"},"311":{"name":"WEATHER BALL","category":"Special"},"312":{"name":"AROMATHERAPY","category":"Status"},"313":{"name":"FAKE TEARS","category":"Status"},"314":{"name":"AIR CUTTER","category":"Special"},"315":{"name":"OVERHEAT","category":"Special"},"316":{"name":"ODOR SLEUTH","category":"Status"},"317":{"name":"ROCK TOMB","category":"Physical"},"318":{"name":"SILVER WIND","category":"Special"},"319":{"name":"METAL SOUND","category":"Status"},"320":{"name":"GRASS WHISTLE","category":"Status"},"321":{"name":"TICKLE","category":"Status"},"322":{"name":"COSMIC POWER","category":"Status"},"323":{"name":"WATER SPOUT","category":"Special"},"324":{"name":"SIGNAL BEAM","category":"Special"},"325":{"name":"SHADOW PUNCH","category":"Physical"},"326":{"name":"EXTRASENSORY","category":"Special"},"327":{"name":"SKY UPPERCUT","category":"Physical"},"328":{"name":"SAND TOMB","category":"Physical"},"329":{"name":"SHEER COLD","category":"Special"},"330":{"name":"MUDDY WATER","category":"Special"},"331":{"name":"BULLET SEED","category":"Physical"},"332":{"name":"AERIAL ACE","category":"Physical"},"333":{"name":"ICICLE SPEAR","category":"Physical"},"334":{"name":"IRON DEFENSE","category":"Status"},"335":{"name":"BLOCK","category":"Status"},"336":{"name":"HOWL","category":"Status"},"337":{"name":"DRAGON CLAW","category":"Physical"},"338":{"name":"FRENZY PLANT","category":"Special"},"339":{"name":"BULK UP","category":"Status"},"340":{"name":"BOUNCE","category":"Physical"},"341":{"name":"MUD SHOT","category":"Special"},"342":{"name":"POISON TAIL","category":"Physical"},"343":{"name":"COVET","category":"Physical"},"344":{"name":"VOLT TACKLE","category":"Physical"},"345":{"name":"MAGICAL LEAF","category":"Special"},"346":{"name":"WATER SPORT","category":"Status"},"347":{"name":"CALM MIND","category":"Status"},"348":{"name":"LEAF BLADE","category":"Physical"},"349":{"name":"DRAGON DANCE","category":"Status"},"350":{"name":"ROCK BLAST","category":"Physical"},"351":{"name":"SHOCK WAVE","category":"Special"},"352":{"name":"WATER PULSE","category":"Special"},"353":{"name":"DOOM DESIRE","category":"Special"},"354":{"name":"PSYCHO BOOST","category":"Special"},"356":{"name":"GRAVITY","category":"Status"},"357":{"name":"MIRACLE EYE","category":"Status"},"358":{"name":"WAKE-UP SLAP","category":"Physical"},"359":{"name":"HAMMER ARM","category":"Physical"},"360":{"name":"GYRO BALL","category":"Physical"},"361":{"name":"HEALING WISH","category":"Status"},"362":{"name":"BRINE","category":"Special"},"363":{"name":"NATURAL GIFT","category":"Physical"},"364":{"name":"FEINT","category":"Physical"},"365":{"name":"PLUCK","category":"Physical"},"366":{"name":"TAILWIND","category":"Status"},"367":{"name":"ACUPRESSURE","category":"Status"},"368":{"name":"METAL BURST","category":"Physical"},"369":{"name":"U-TURN","category":"Physical"},"370":{"name":"CLOSE COMBAT","category":"Physical"},"371":{"name":"PAYBACK","category":"Physical"},"372":{"name":"ASSURANCE","category":"Physical"},"373":{"name":"EMBARGO","category":"Status"},"374":{"name":"FLING","category":"Physical"},"375":{"name":"PSYCHO SHIFT","category":"Status"},"376":{"name":"TRUMP CARD","category":"Special"},"377":{"name":"HEAL BLOCK","category":"Status"},"378":{"name":"WRING OUT","category":"Special"},"379":{"name":"POWER TRICK","category":"Status"},"380":{"name":"GASTRO ACID","category":"Status"},"381":{"name":"LUCKY CHANT","category":"Status"},"382":{"name":"ME FIRST","category":"Status"},"383":{"name":"COPYCAT","category":"Status"},"384":{"name":"POWER SWAP","category":"Status"},"385":{"name":"GUARD SWAP","category":"Status"},"386":{"name":"PUNISHMENT","category":"Physical"},"387":{"name":"LAST RESORT","category":"Physical"},"388":{"name":"WORRY SEED","category":"Status"},"389":{"name":"SUCKER PUNCH","category":"Physical"},"390":{"name":"TOXIC SPIKES","category":"Status"},"391":{"name":"HEART SWAP","category":"Status"},"392":{"name":"AQUA RING","category":"Status"},"393":{"name":"MAGNET RISE","category":"Status"},"394":{"name":"FLARE BLITZ","category":"Physical"},"395":{"name":"FORCE PALM","category":"Physical"},"396":{"name":"AURA SPHERE","category":"Special"},"397":{"name":"ROCK POLISH","category":"Status"},"398":{"name":"POISON JAB","category":"Physical"},"399":{"name":"DARK PULSE","category":"Special"},"400":{"name":"NIGHT SLASH","category":"Physical"},"401":{"name":"AQUA TAIL","category":"Physical"},"402":{"name":"SEED BOMB","category":"Physical"},"403":{"name":"AIR SLASH","category":"Special"},"404":{"name":"X-SCISSOR","category":"Physical"},"405":{"name":"BUG BUZZ","category":"Special"},"406":{"name":"DRAGON PULSE","category":"Special"},"407":{"name":"DRAGON RUSH","category":"Physical"},"408":{"name":"POWER GEM","category":"Special"},"409":{"name":"DRAIN PUNCH","category":"Physical"},"410":{"name":"VACUUM WAVE","category":"Special"},"411":{"name":"FOCUS BLAST","category":"Special"},"412":{"name":"ENERGY BALL","category":"Special"},"413":{"name":"BRAVE BIRD","category":"Physical"},"414":{"name":"EARTH POWER","category":"Special"},"415":{"name":"SWITCHEROO","category":"Status"},"416":{"name":"GIGA IMPACT","category":"Physical"},"417":{"name":"NASTY PLOT","category":"Status"},"418":{"name":"BULLET PUNCH","category":"Physical"},"419":{"name":"AVALANCHE","category":"Physical"},"420":{"name":"ICE SHARD","category":"Physical"},"421":{"name":"SHADOW CLAW","category":"Physical"},"422":{"name":"THUNDER FANG","category":"Physical"},"423":{"name":"ICE FANG","category":"Physical"},"424":{"name":"FIRE FANG","category":"Physical"},"425":{"name":"SHADOW SNEAK","category":"Physical"},"426":{"name":"MUD BOMB","category":"Special"},"427":{"name":"PSYCHO CUT","category":"Physical"},"428":{"name":"ZEN HEADBUTT","category":"Physical"},"429":{"name":"MIRROR SHOT","category":"Special"},"430":{"name":"FLASH CANNON","category":"Special"},"431":{"name":"ROCK CLIMB","category":"Physical"},"432":{"name":"DEFOG","category":"Status"},"433":{"name":"TRICK ROOM","category":"Status"},"434":{"name":"DRACO METEOR","category":"Special"},"435":{"name":"DISCHARGE","category":"Special"},"436":{"name":"LAVA PLUME","category":"Special"},"437":{"name":"LEAF STORM","category":"Special"},"438":{"name":"POWER WHIP","category":"Physical"},"439":{"name":"ROCK WRECKER","category":"Physical"},"440":{"name":"CROSS POISON","category":"Physical"},"441":{"name":"GUNK SHOT","category":"Physical"},"442":{"name":"IRON HEAD","category":"Physical"},"443":{"name":"MAGNET BOMB","category":"Physical"},"444":{"name":"STONE EDGE","category":"Physical"},"445":{"name":"CAPTIVATE","category":"Status"},"446":{"name":"STEALTH ROCK","category":"Status"},"447":{"name":"GRASS KNOT","category":"Special"},"448":{"name":"CHATTER","category":"Special"},"449":{"name":"JUDGMENT","category":"Special"},"450":{"name":"BUG BITE","category":"Physical"},"451":{"name":"CHARGE BEAM","category":"Special"},"452":{"name":"WOOD HAMMER","category":"Physical"},"453":{"name":"AQUA JET","category":"Physical"},"454":{"name":"ATTACK ORDER","category":"Physical"},"455":{"name":"DEFEND ORDER","category":"Status"},"456":{"name":"HEAL ORDER","category":"Status"},"457":{"name":"HEAD SMASH","category":"Physical"},"458":{"name":"DOUBLE HIT","category":"Physical"},"459":{"name":"ROAR OF TIME","category":"Special"},"460":{"name":"SPACIAL REND","category":"Special"},"461":{"name":"LUNAR DANCE","category":"Status"},"462":{"name":"CRUSH GRIP","category":"Physical"},"463":{"name":"MAGMA STORM","category":"Special"},"464":{"name":"DARK VOID","category":"Status"},"465":{"name":"SEED FLARE","category":"Special"},"466":{"name":"OMINOUS WIND","category":"Special"},"467":{"name":"SHADOW FORCE","category":"Physical"},"469":{"name":"WIDE GUARD","category":"Status"},"470":{"name":"GUARD SPLIT","category":"Status"},"471":{"name":"POWER SPLIT","category":"Status"},"472":{"name":"WONDER ROOM","category":"Status"},"473":{"name":"PSYSHOCK","category":"Special"},"474":{"name":"VENOSHOCK","category":"Special"},"475":{"name":"AUTOTOMIZE","category":"Status"},"476":{"name":"RAGE POWDER","category":"Status"},"477":{"name":"TELEKINESIS","category":"Status"},"478":{"name":"MAGIC ROOM","category":"Status"},"479":{"name":"SMACK DOWN","category":"Physical"},"480":{"name":"STORM THROW","category":"Physical"},"481":{"name":"FLAME BURST","category":"Special"},"482":{"name":"SLUDGE WAVE","category":"Special"},"483":{"name":"QUIVER DANCE","category":"Status"},"484":{"name":"HEAVY SLAM","category":"Physical"},"485":{"name":"SYNCHRONOISE","category":"Special"},"486":{"name":"ELECTRO BALL","category":"Special"},"487":{"name":"SOAK","category":"Status"},"488":{"name":"FLAME CHARGE","category":"Physical"},"489":{"name":"COIL","category":"Status"},"490":{"name":"LOW SWEEP","category":"Physical"},"491":{"name":"ACID SPRAY","category":"Special"},"492":{"name":"FOUL PLAY","category":"Physical"},"493":{"name":"SIMPLE BEAM","category":"Status"},"494":{"name":"ENTRAINMENT","category":"Status"},"495":{"name":"AFTER YOU","category":"Status"},"496":{"name":"ROUND","category":"Special"},"497":{"name":"ECHOED VOICE","category":"Special"},"498":{"name":"CHIP AWAY","category":"Physical"},"499":{"name":"CLEAR SMOG","category":"Special"},"500":{"name":"STORED POWER","category":"Special"},"501":{"name":"QUICK GUARD","category":"Status"},"502":{"name":"ALLY SWITCH","category":"Status"},"503":{"name":"SCALD","category":"Special"},"504":{"name":"SHELL SMASH","category":"Status"},"505":{"name":"HEAL PULSE","category":"Status"},"506":{"name":"HEX","category":"Special"},"507":{"name":"SKY DROP","category":"Physical"},"508":{"name":"SHIFT GEAR","category":"Status"},"509":{"name":"CIRCLE THROW","category":"Physical"},"510":{"name":"INCINERATE","category":"Special"},"511":{"name":"QUASH","category":"Status"},"512":{"name":"ACROBATICS","category":"Physical"},"513":{"name":"REFLECT TYPE","category":"Status"},"514":{"name":"RETALIATE","category":"Physical"},"515":{"name":"FINAL GAMBIT","category":"Special"},"516":{"name":"BESTOW","category":"Status"},"517":{"name":"INFERNO","category":"Special"},"518":{"name":"WATER PLEDGE","category":"Special"},"519":{"name":"FIRE PLEDGE","category":"Special"},"520":{"name":"GRASS PLEDGE","category":"Special"},"521":{"name":"VOLT SWITCH","category":"Special"},"522":{"name":"STRUGGLE BUG","category":"Special"},"523":{"name":"BULLDOZE","category":"Physical"},"524":{"name":"FROST BREATH","category":"Special"},"525":{"name":"DRAGON TAIL","category":"Physical"},"526":{"name":"WORK UP","category":"Status"},"527":{"name":"ELECTROWEB","category":"Special"},"528":{"name":"WILD CHARGE","category":"Physical"},"529":{"name":"DRILL RUN","category":"Physical"},"530":{"name":"DUAL CHOP","category":"Physical"},"531":{"name":"HEART STAMP","category":"Physical"},"532":{"name":"HORN LEECH","category":"Physical"},"533":{"name":"SACRED SWORD","category":"Physical"},"534":{"name":"RAZOR SHELL","category":"Physical"},"535":{"name":"HEAT CRASH","category":"Physical"},"536":{"name":"LEAF TORNADO","category":"Special"},"537":{"name":"STEAMROLLER","category":"Physical"},"538":{"name":"COTTON GUARD","category":"Status"},"539":{"name":"NIGHT DAZE","category":"Special"},"540":{"name":"PSYSTRIKE","category":"Special"},"541":{"name":"TAIL SLAP","category":"Physical"},"542":{"name":"HURRICANE","category":"Special"},"543":{"name":"HEAD CHARGE","category":"Physical"},"544":{"name":"GEAR GRIND","category":"Physical"},"545":{"name":"SEARING SHOT","category":"Special"},"546":{"name":"TECHNO BLAST","category":"Special"},"547":{"name":"RELIC SONG","category":"Special"},"548":{"name":"SECRET SWORD","category":"Special"},"549":{"name":"GLACIATE","category":"Special"},"550":{"name":"BOLT STRIKE","category":"Physical"},"551":{"name":"BLUE FLARE","category":"Special"},"552":{"name":"FIERY DANCE","category":"Special"},"553":{"name":"FREEZE SHOCK","category":"Physical"},"554":{"name":"ICE BURN","category":"Special"},"555":{"name":"SNARL","category":"Special"},"556":{"name":"ICICLE CRASH","category":"Physical"},"557":{"name":"V-CREATE","category":"Physical"},"558":{"name":"FUSION FLARE","category":"Special"},"559":{"name":"FUSION BOLT","category":"Physical"}};

  const BST_DB = {"1":318,"2":405,"3":525,"4":309,"5":405,"6":534,"7":314,"8":405,"9":530,"10":195,"11":205,"12":385,"13":195,"14":205,"15":385,"16":251,"17":349,"18":469,"19":253,"20":413,"21":262,"22":442,"23":288,"24":438,"25":300,"26":475,"27":300,"28":450,"29":275,"30":365,"31":495,"32":273,"33":365,"34":495,"35":323,"36":473,"37":299,"38":505,"39":270,"40":425,"41":245,"42":455,"43":320,"44":395,"45":480,"46":285,"47":405,"48":305,"49":450,"50":265,"51":405,"52":290,"53":440,"54":320,"55":500,"56":305,"57":455,"58":350,"59":555,"60":300,"61":385,"62":500,"63":310,"64":400,"65":490,"66":305,"67":405,"68":505,"69":300,"70":390,"71":480,"72":335,"73":515,"74":300,"75":390,"76":485,"77":410,"78":500,"79":315,"80":490,"81":325,"82":465,"83":352,"84":310,"85":460,"86":325,"87":475,"88":325,"89":500,"90":305,"91":525,"92":310,"93":405,"94":500,"95":385,"96":328,"97":483,"98":325,"99":475,"100":330,"101":480,"102":325,"103":520,"104":320,"105":425,"106":455,"107":455,"108":385,"109":340,"110":490,"111":345,"112":485,"113":450,"114":435,"115":490,"116":295,"117":440,"118":320,"119":450,"120":340,"121":520,"122":460,"123":500,"124":455,"125":490,"126":495,"127":500,"128":490,"129":200,"130":540,"131":535,"132":288,"133":325,"134":525,"135":525,"136":525,"137":395,"138":355,"139":495,"140":355,"141":495,"142":515,"143":540,"144":580,"145":580,"146":580,"147":300,"148":420,"149":600,"150":680,"151":600,"152":318,"153":405,"154":525,"155":309,"156":405,"157":534,"158":314,"159":405,"160":530,"161":215,"162":415,"163":262,"164":442,"165":265,"166":390,"167":250,"168":390,"169":535,"170":330,"171":460,"172":205,"173":218,"174":210,"175":245,"176":405,"177":320,"178":470,"179":280,"180":365,"181":500,"182":480,"183":250,"184":410,"185":410,"186":500,"187":250,"188":340,"189":450,"190":360,"191":180,"192":425,"193":390,"194":210,"195":430,"196":525,"197":525,"198":405,"199":490,"200":435,"202":405,"203":455,"204":290,"205":465,"206":415,"207":430,"208":510,"209":300,"210":450,"211":430,"212":500,"213":505,"214":500,"215":430,"216":330,"217":500,"218":250,"219":410,"220":250,"221":450,"222":380,"223":300,"224":480,"225":330,"226":465,"227":465,"228":330,"229":500,"230":540,"231":330,"232":500,"233":515,"234":465,"235":250,"236":210,"237":455,"238":305,"239":360,"240":365,"241":490,"242":540,"243":580,"244":580,"245":580,"246":300,"247":410,"248":600,"249":680,"250":680,"251":600,"252":310,"253":405,"254":530,"255":310,"256":405,"257":530,"258":310,"259":405,"260":535,"261":220,"262":420,"263":240,"264":420,"265":195,"266":205,"267":385,"268":205,"269":385,"270":220,"271":340,"272":480,"273":220,"274":340,"275":480,"276":270,"277":430,"278":270,"279":430,"280":198,"281":278,"282":518,"283":269,"284":414,"285":295,"286":460,"287":280,"288":440,"289":670,"290":266,"291":456,"292":236,"293":240,"294":360,"295":480,"296":237,"297":474,"298":190,"299":375,"300":260,"301":380,"302":380,"303":380,"304":330,"305":430,"306":530,"307":280,"308":410,"309":295,"310":475,"311":405,"312":405,"313":400,"314":400,"315":400,"316":302,"317":467,"318":305,"319":460,"320":400,"321":500,"322":305,"323":460,"324":470,"325":330,"326":470,"327":360,"328":290,"329":340,"330":520,"331":335,"332":475,"333":310,"334":490,"335":458,"336":458,"337":440,"338":440,"339":288,"340":468,"341":308,"342":468,"343":300,"344":500,"345":355,"346":495,"347":355,"348":495,"349":200,"350":540,"351":420,"352":440,"353":295,"354":455,"355":295,"356":455,"357":460,"358":425,"359":465,"360":260,"361":300,"362":480,"363":290,"364":410,"365":530,"366":345,"367":485,"368":485,"369":485,"370":330,"371":300,"372":420,"373":600,"374":300,"375":420,"376":600,"377":580,"378":580,"379":580,"380":600,"381":600,"382":670,"383":670,"384":680,"385":600,"386":600,"387":318,"388":405,"389":525,"390":309,"391":405,"392":534,"393":314,"394":405,"395":530,"396":245,"397":340,"398":475,"399":250,"400":410,"401":194,"402":384,"403":263,"404":363,"405":523,"406":280,"407":505,"408":350,"409":495,"410":350,"411":495,"412":224,"413":424,"415":244,"416":474,"417":405,"418":330,"419":495,"420":275,"421":450,"424":482,"425":348,"426":498,"427":350,"428":480,"429":495,"430":505,"431":310,"432":452,"433":285,"434":329,"435":479,"436":300,"437":500,"438":290,"439":310,"440":220,"441":411,"442":485,"443":300,"444":410,"445":600,"446":390,"447":285,"448":525,"449":330,"450":525,"451":330,"452":500,"453":300,"454":490,"455":454,"456":330,"457":460,"458":345,"459":334,"460":494,"461":510,"462":535,"463":515,"464":535,"465":535,"466":540,"467":540,"468":545,"469":515,"470":525,"471":525,"472":510,"473":530,"474":535,"475":518,"476":525,"477":525,"478":480,"479":440,"480":580,"481":580,"482":580,"483":680,"484":680,"485":600,"486":670,"487":680,"488":600,"489":480,"490":600,"491":600,"493":720,"494":600,"495":308,"496":413,"497":528,"498":308,"499":418,"500":528,"501":308,"502":413,"503":528,"504":255,"505":420,"506":275,"507":370,"508":490,"509":281,"510":446,"511":316,"512":498,"513":316,"514":498,"515":316,"516":498,"517":292,"518":487,"519":264,"520":358,"521":478,"522":295,"523":497,"524":280,"525":390,"526":505,"527":313,"528":425,"529":328,"530":508,"531":445,"532":305,"533":405,"534":505,"535":294,"536":384,"537":499,"538":465,"539":465,"540":310,"541":380,"542":490,"543":260,"544":360,"545":475,"546":280,"547":480,"548":280,"549":480,"550":460,"551":292,"552":351,"553":509,"554":315,"555":480,"556":461,"557":325,"558":475,"559":348,"560":488,"561":490,"562":303,"563":483,"564":355,"565":495,"566":401,"567":567,"568":329,"569":474,"570":330,"571":510,"572":300,"573":470,"574":290,"575":390,"576":490,"577":290,"578":370,"579":490,"580":305,"581":473,"582":305,"583":395,"584":535,"585":335,"586":475,"587":428,"588":315,"589":495,"590":294,"591":464,"592":335,"593":480,"594":470,"595":319,"596":472,"597":305,"598":489,"599":300,"600":440,"601":520,"602":275,"603":405,"604":515,"605":335,"606":485,"607":275,"608":370,"609":520,"610":320,"611":410,"612":540,"613":305,"614":485,"615":485,"616":305,"617":495,"618":471,"619":350,"620":510,"621":485,"622":303,"623":483,"624":340,"625":490,"626":490,"627":350,"628":510,"629":370,"630":510,"631":484,"632":484,"633":300,"634":420,"635":600,"636":360,"637":550,"638":580,"639":580,"640":580,"641":580,"642":580,"643":680,"644":680,"645":600,"646":660,"647":580,"648":600,"649":600};

  const TYPE_COLORS = {
    NORMAL:"#A8A77A", FIRE:"#EE8130", WATER:"#6390F0", ELECTRIC:"#F7D02C",
    GRASS:"#7AC74C", ICE:"#96D9D6", FIGHTING:"#C22E28", POISON:"#A33EA1",
    GROUND:"#E2BF65", FLYING:"#A98FF3", PSYCHIC:"#F95587", BUG:"#A6B91A",
    ROCK:"#B6A136", GHOST:"#735797", DRAGON:"#6F35FC", DARK:"#705746",
    STEEL:"#B7B7CE", FAIRY:"#D685AD"
  };

  const REMOTE_MOVE_META = new Map();
  const REQUESTED_MOVE_META = new Set();

  const requestMoveMeta = ids => {
    const missing = [...new Set(ids)]
      .filter(id => id > 0 && !REMOTE_MOVE_META.has(id) && !REQUESTED_MOVE_META.has(id));
    if (!missing.length) return;
    missing.forEach(id => REQUESTED_MOVE_META.add(id));
    window.postMessage({
      source: "celarys-dex-main",
      op: "move-meta-request",
      ids: missing
    }, "*");
  };

  window.addEventListener("message", event => {
    const msg = event.data;
    if (!msg || msg.source !== "celarys-dex-bridge" || msg.op !== "move-meta-response") return;
    for (const [id, meta] of Object.entries(msg.data || {})) {
      REMOTE_MOVE_META.set(Number(id), meta);
    }
  });


  const SUBSTRUCT_ORDERS = [
    "GAEM","GAME","GEAM","GEMA","GMAE","GMEA",
    "AGEM","AGME","AEGM","AEMG","AMGE","AMEG",
    "EGAM","EGMA","EAGM","EAMG","EMGA","EMAG",
    "MGAE","MGEA","MAGE","MAEG","MEGA","MEAG"
  ];

  let wasmMemory = null;
  let coreInstance = null;
  let coreExports = null;
  let trackerGetJson = null;
  let trackerFreeJson = null;
  let trackerMemory = null;
  let playerBase = null;
  let currentEnemyBase = null;
  let lastEncounterId = null;
  let lastBattleState = false;
  let defaultLayoutApplied = false;
  let abilityEncounterKey = "";
  let abilityPending = "";
  let abilityPendingCount = 0;
  let abilityDisplay = "…";

  const read32LE = (u8, off) => (
    (u8[off] |
      (u8[off + 1] << 8) |
      (u8[off + 2] << 16) |
      (u8[off + 3] << 24)) >>> 0
  );

  const getViews = () => {
    const buffers = [];
    const add = buffer => {
      if (!(buffer instanceof ArrayBuffer) && !(typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer)) return;
      if (!buffers.includes(buffer)) buffers.push(buffer);
    };

    add(wasmMemory?.buffer);

    const m = getModule();
    add(m?.HEAPU8?.buffer);
    add(m?.HEAP8?.buffer);
    add(m?.wasmMemory?.buffer);
    add(m?.memory?.buffer);

    const buffer = buffers.sort((a, b) => b.byteLength - a.byteLength)[0];
    if (!buffer) return null;

    return {
      u8: new Uint8Array(buffer),
      u16: new Uint16Array(buffer)
    };
  };

  const read16 = (u16, byteAddr) => u16[byteAddr >>> 1];

  const decodeSubstruct = (base, kind, u8) => {
    if (base < 0 || base + PARTY_SIZE > u8.length) return null;

    const personality = read32LE(u8, base);
    const otId = read32LE(u8, base + 4);
    const key = (personality ^ otId) >>> 0;
    const order = SUBSTRUCT_ORDERS[personality % 24];
    const slot = order.indexOf(kind);
    if (slot < 0) return null;

    const encryptedBase = base + 32 + slot * 12;
    const dec = new Uint8Array(12);

    for (let i = 0; i < 12; i += 4) {
      const word = (read32LE(u8, encryptedBase + i) ^ key) >>> 0;
      dec[i] = word & 0xff;
      dec[i + 1] = (word >>> 8) & 0xff;
      dec[i + 2] = (word >>> 16) & 0xff;
      dec[i + 3] = (word >>> 24) & 0xff;
    }

    return dec;
  };

  const decodeSpecies = (base, u8) => {
    const growth = decodeSubstruct(base, "G", u8);
    return growth ? (growth[0] | (growth[1] << 8)) : 0;
  };

  const normalizeName = s =>
    String(s ?? "").trim().toUpperCase().replace(/[\s\-]+/g, "");

  const normalizeAbility = value => {
    if (typeof value === "string") return value.trim();
    if (value && typeof value === "object" && typeof value.name === "string") return value.name.trim();
    return "";
  };

  const getStableAbility = data => {
    const key = `${data?.enemy?.speciesId ?? 0}|${data?.enemy?.level ?? 0}|${currentEnemyBase ?? ""}`;
    if (key !== abilityEncounterKey) {
      abilityEncounterKey = key;
      abilityPending = "";
      abilityPendingCount = 0;
      abilityDisplay = "…";
    }

    const candidate = normalizeAbility(data?.enemy?.ability);
    if (!candidate || candidate === "?" || candidate === "—") return abilityDisplay;

    if (candidate === abilityPending) {
      abilityPendingCount++;
    } else {
      abilityPending = candidate;
      abilityPendingCount = 1;
    }

    if (abilityPendingCount >= 3) abilityDisplay = candidate;
    return abilityDisplay;
  };

  const getRuntimeMove = (data, moveInfo) => {
    const liveMoves = Array.isArray(data?.enemy?.moves) ? data.enemy.moves : [];
    const targetName = normalizeName(moveInfo.name);

    return liveMoves.find(m => {
      if (!m) return false;
      if (Number.isFinite(m.id) && m.id === moveInfo.id) return true;
      return normalizeName(m.name) === targetName;
    }) ?? null;
  };

  const decodeEnemyMoves = (base, data, u8) => {
    const dec = decodeSubstruct(base, "A", u8);
    if (!dec) return [];

    const out = [];

    for (let i = 0; i < 4; i++) {
      const id = dec[i * 2] | (dec[i * 2 + 1] << 8);
      const pp = dec[8 + i];

      if (!id) {
        out.push({ id: 0, name: "—", pp: 0, category: null, power: null, accuracy: null, type: null });
        continue;
      }

      const db = MOVE_DB[id] ?? null;
      const remote = REMOTE_MOVE_META.get(id) ?? null;
      const baseInfo = {
        id,
        name: db?.name || remote?.name || `Move #${id}`,
        pp,
        category: db?.category ?? remote?.category ?? null
      };
      const runtime = getRuntimeMove(data, baseInfo);

      out.push({
        ...baseInfo,
        category: runtime?.category ?? remote?.category ?? baseInfo.category,
        power: runtime?.power ?? remote?.power ?? null,
        accuracy: runtime?.accuracy ?? remote?.accuracy ?? null,
        type: runtime?.type ?? remote?.type ?? null
      });
    }

    requestMoveMeta(out.map(m => m.id));
    return out;
  };

  let cachedModule = null;
  let lastModuleScan = 0;

  const validModule = m =>
    !!m && typeof m === "object" && typeof m.UTF8ToString === "function" &&
    (typeof m.ccall === "function" || typeof m._celarys_tracker_get_json === "function");

  const getModule = () => {
    const direct = [
      window.__celarysEmuModule,
      window.celarysEmuModule,
      window.Module,
      cachedModule
    ];

    for (const m of direct) {
      if (validModule(m)) {
        cachedModule = m;
        return m;
      }
    }

    const now = performance.now();
    if (now - lastModuleScan < 1000) return null;
    lastModuleScan = now;

    for (const key of Object.getOwnPropertyNames(window)) {
      if (!/(?:celarys|emu|module)/i.test(key)) continue;
      try {
        const m = window[key];
        if (validModule(m)) {
          cachedModule = m;
          window.__celarysEmuModule = m;
          return m;
        }
      } catch {}
    }

    return null;
  };

  const readCString = (memory, ptr) => {
    if (!memory || !ptr) return "";
    const u8 = new Uint8Array(memory.buffer);
    let end = ptr >>> 0;
    const start = end;
    const limit = Math.min(u8.length, start + 1024 * 1024);
    while (end < limit && u8[end] !== 0) end++;
    if (end <= start) return "";
    return new TextDecoder().decode(u8.subarray(start, end));
  };

  const getTracker = () => {
    const m = getModule();

    if (m) {
      let ptr = 0;
      try {
        ptr = typeof m._celarys_tracker_get_json === "function"
          ? m._celarys_tracker_get_json()
          : m.ccall("celarys_tracker_get_json", "number", [], []);
      } catch {
        ptr = 0;
      }

      if (ptr) {
        try {
          const data = JSON.parse(m.UTF8ToString(ptr));
          window.__startabDexTrackerSource = "module";
          return data;
        } catch {} finally {
          try {
            if (typeof m._celarys_tracker_free_json === "function") m._celarys_tracker_free_json(ptr);
            else m.ccall("celarys_tracker_free_json", null, ["number"], [ptr]);
          } catch {}
        }
      }
    }

    if (!trackerGetJson || !trackerMemory) return null;

    let ptr = 0;
    try {
      ptr = trackerGetJson();
    } catch {
      return null;
    }

    if (!ptr) return null;

    try {
      const text = readCString(trackerMemory, Number(ptr));
      const data = JSON.parse(text);
      window.__startabDexTrackerSource = "wasm";
      return data;
    } catch {
      return null;
    } finally {
      try {
        if (trackerFreeJson) trackerFreeJson(ptr);
      } catch {}
    }
  };

  const loadOverlayState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const saveOverlayState = box => {
    try {
      if (box.style.display === "none") return;
      const r = box.getBoundingClientRect();
      if (r.width < 100 || r.height < 100) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        left: r.left,
        top: r.top,
        width: r.width,
        height: r.height
      }));
    } catch {}
  };

  const clampOverlay = (box, left, top) => {
    const r = box.getBoundingClientRect();
    const margin = 4;
    return {
      left: Math.min(Math.max(margin, left), Math.max(margin, innerWidth - r.width - margin)),
      top: Math.min(Math.max(margin, top), Math.max(margin, innerHeight - r.height - margin))
    };
  };

  const applySavedOverlay = box => {
    const state = loadOverlayState();
    if (!state) return;

    if (Number.isFinite(state.width)) {
      const maxWidth = Math.max(120, innerWidth - 8);
      box.style.width = `${Math.min(Math.max(220, state.width), maxWidth)}px`;
    }
    if (Number.isFinite(state.height)) {
      const maxHeight = Math.max(120, innerHeight - 8);
      box.style.height = `${Math.min(Math.max(180, state.height), maxHeight)}px`;
    }

    requestAnimationFrame(() => {
      const p = clampOverlay(
        box,
        Number.isFinite(state.left) ? state.left : 12,
        Number.isFinite(state.top) ? state.top : 12
      );
      box.style.left = `${p.left}px`;
      box.style.top = `${p.top}px`;
    });
  };

  const makeDraggable = box => {
    const handle = box.querySelector(".cws-topbar");
    if (!handle) return;

    let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
    handle.style.cursor = "grab";
    handle.style.touchAction = "none";

    handle.addEventListener("pointerdown", e => {
      if (e.button !== 0) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      const r = box.getBoundingClientRect();
      sl = r.left; st = r.top;
      handle.style.cursor = "grabbing";
      handle.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    });

    handle.addEventListener("pointermove", e => {
      if (!dragging) return;
      const p = clampOverlay(box, sl + e.clientX - sx, st + e.clientY - sy);
      box.style.left = `${p.left}px`;
      box.style.top = `${p.top}px`;
    });

    const end = e => {
      if (!dragging) return;
      dragging = false;
      handle.style.cursor = "grab";
      try { handle.releasePointerCapture?.(e.pointerId); } catch {}
      saveOverlayState(box);
    };

    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);

    if ("ResizeObserver" in window) {
      let timer;
      new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => saveOverlayState(box), 180);
      }).observe(box);
    }

    const keepInViewport = () => {
      const r = box.getBoundingClientRect();
      const maxWidth = Math.max(120, innerWidth - 8);
      const maxHeight = Math.max(120, innerHeight - 8);
      if (r.width > maxWidth) box.style.width = `${maxWidth}px`;
      if (r.height > maxHeight) box.style.height = `${maxHeight}px`;
      requestAnimationFrame(() => {
        const next = box.getBoundingClientRect();
        const p = clampOverlay(box, next.left, next.top);
        box.style.left = `${p.left}px`;
        box.style.top = `${p.top}px`;
      });
    };

    window.addEventListener("resize", keepInViewport, {passive:true});
  };

  const createActiveBadge = () => {
    const existing = document.getElementById("startab-dex-active");
    if (existing) return existing;

    const badge = document.createElement("div");
    badge.id = "startab-dex-active";
    badge.innerHTML = `<span class="sad-dot"></span><strong>StartAB Dex</strong>`;

    Object.assign(badge.style, {
      position: "fixed",
      top: "10px",
      left: "10px",
      zIndex: "2147483647",
      display: "flex",
      alignItems: "center",
      gap: "7px",
      padding: "7px 10px",
      borderRadius: "8px",
      background: "rgba(32,35,34,.94)",
      border: "2px solid #a7aaa8",
      boxShadow: "0 4px 14px rgba(0,0,0,.35)",
      color: "#f4f5f2",
      fontFamily: "VPPixel, monospace",
      fontSize: "18px",
      lineHeight: "1",
      letterSpacing: ".02em",
      color: "#fff",
      textShadow: "1px 1px 0 #1F1F1F",
      pointerEvents: "none"
    });

    const style = document.createElement("style");
    style.textContent = `
      #startab-dex-active .sad-dot{
        width:9px;
        height:9px;
        border-radius:50%;
        background:#67d86d;
        box-shadow:0 0 8px rgba(103,216,109,.7)
      }
    `;

    (document.head || document.documentElement).appendChild(style);
    (document.body || document.documentElement).appendChild(badge);
    return badge;
  };

  const showActiveBadge = () => {
    const badge = createActiveBadge();
    const box = document.getElementById("celarys-wild-stats-box");
    badge.style.display = "flex";
    if (box) box.style.display = "none";
  };

  const showDex = () => {
    const badge = createActiveBadge();
    const box = ensureOverlay();
    badge.style.display = "none";
    if (box) box.style.display = "";
  };

  const createOverlay = () => {
    const existing = document.getElementById("celarys-wild-stats-box");
    if (existing) return existing;

    const box = document.createElement("section");
    box.id = "celarys-wild-stats-box";
    box.innerHTML = `
      <div class="cws-topbar" title="Trascina per spostare">
        <div class="cws-lens"></div>
        <div class="cws-title">
          <b>STARTAB DEX</b>
        </div>
        <div class="cws-leds"><i></i><i></i><i></i></div>
      </div>

      <div class="cws-shell">
        <div id="cws-status" class="cws-status">In attesa dell'emulatore…</div>

        <div id="cws-body" class="cws-body" style="display:none">
          <div class="cws-upper">
            <div class="cws-profile">
              <div style="display: block">
              <div id="cws-sprite" class="cws-sprite">
                <div class="cws-pokeball"></div>
              </div>
              <div id="cws-types" class="cws-types"></div>
              </div>
              <div class="cws-profile-info">
                <div class="cws-name-row">
                  <div id="cws-name" class="cws-name">—</div>
                  <div id="cws-battle-kind" class="cws-battle-kind">WILD</div>
                </div>
                <div id="cws-hpline" class="cws-hpline">HP — / —</div>
                <div class="cws-label">ABILITY</div>
                <div id="cws-ability" class="cws-ability">—</div>
              </div>
            </div>

            <div class="cws-stats">
              <div><span>HP</span><b id="cws-hp">—</b></div>
              <div><span>ATK</span><b id="cws-atk">—</b></div>
              <div><span>DEF</span><b id="cws-def">—</b></div>
              <div><span>SPA</span><b id="cws-spa">—</b></div>
              <div><span>SPD</span><b id="cws-spd">—</b></div>
              <div><span>SPE</span><b id="cws-spe">—</b></div>
              <div class="cws-bst"><span>BST</span><b id="cws-bst">—</b></div>
            </div>
          </div>

          <div class="cws-divider"></div>

          <div class="cws-moves-title">
            <span>MOVES</span>
            <small>PP</small><small>POW</small><small>ACC</small>
          </div>
          <div id="cws-moves" class="cws-moves"></div>
        </div>
      </div>

      <div class="cws-bottom">
      </div>
    `;

    Object.assign(box.style, {
      position: "fixed",
      left: "10px",
      top: "10px",
      zIndex: "2147483647",
      width: "min(340px, calc(100vw - 20px))",
      height: "auto",
      minWidth: "min(220px, calc(100vw - 8px))",
      minHeight: "0",
      maxWidth: "calc(100vw - 8px)",
      maxHeight: "calc(100vh - 8px)",
      resize: "both",
      overflow: "auto",
      boxSizing: "border-box",
      containerType: "inline-size",
      pointerEvents: "auto",
      userSelect: "none"
    });

    const style = document.createElement("style");
    style.textContent = `
      #celarys-wild-stats-box{
        --red:#cf2f36;--darkred:#681a20;--screen:#202322;--line:#a7aaa8;
        --text:#f4f5f2;--muted:#b8bbb7;--lime:#c6e46d;--cyan:#86dfe4;
        font-family:VPPixel,monospace;font-size:13px;line-height:1;color:#fff;
        text-shadow:var(--tr-shadow-off,1px) var(--tr-shadow-off,1px) 0 #1F1F1F;
        white-space:normal;background:linear-gradient(#e2454c,#bd252c);
        border:3px solid var(--darkred);border-radius:15px;
        box-shadow:0 5px 0 #54151a,0 11px 26px rgba(0,0,0,.42);
        scrollbar-width:thin;
      }
      #celarys-wild-stats-box *{box-sizing:border-box;font-family:VPPixel,monospace;min-width:0}
      #celarys-wild-stats-box .cws-title b{font-size:19px;line-height:1;font-weight:900;letter-spacing:.04em}
      #celarys-wild-stats-box .cws-name{font-size:19px;line-height:1;font-weight:900;overflow-wrap:anywhere}
      #celarys-wild-stats-box .cws-battle-kind{font-size:14px}
      #celarys-wild-stats-box .cws-hpline{font-size:16px}
      #celarys-wild-stats-box .cws-type{font-size:14px}
      #celarys-wild-stats-box .cws-label{font-size:14px}
      #celarys-wild-stats-box .cws-ability{font-size:17px}
      #celarys-wild-stats-box .cws-stats span,#celarys-wild-stats-box .cws-stats b{font-size:18px}
      #celarys-wild-stats-box .cws-moves-title span,#celarys-wild-stats-box .cws-moves-title small{font-size:15px}
      #celarys-wild-stats-box .cws-move-name,#celarys-wild-stats-box .cws-num{font-size:16px}
      #celarys-wild-stats-box .cws-topbar{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:8px;align-items:center;padding:6px 9px;background:linear-gradient(rgba(255,255,255,.16),rgba(0,0,0,.05))}
      #celarys-wild-stats-box .cws-lens{width:30px;height:30px;border-radius:50%;border:3px solid #f1efe4;background:radial-gradient(circle at 34% 28%,#fff 0 8%,#a7eeff 10% 28%,#37aee0 31% 67%,#13648a 69%);box-shadow:0 0 0 2px #5b191d}
      #celarys-wild-stats-box .cws-title{display:flex;flex-direction:column}
      #celarys-wild-stats-box .cws-leds{display:flex;gap:4px;align-self:start;margin-top:2px}
      #celarys-wild-stats-box .cws-leds i{width:8px;height:8px;border-radius:50%;background:#f4d44b;border:1px solid #65191e}
      #celarys-wild-stats-box .cws-leds i:nth-child(2){background:#67d86d}
      #celarys-wild-stats-box .cws-leds i:nth-child(3){background:#62a9ee}
      #celarys-wild-stats-box .cws-body,#celarys-wild-stats-box .cws-status{background:var(--screen);border:2px solid #111;box-shadow:inset 0 0 0 2px #333}
      #celarys-wild-stats-box .cws-status{min-height:120px;display:grid;place-items:center;padding:14px;color:var(--lime);font-weight:800;text-align:center;white-space:normal}
      #celarys-wild-stats-box .cws-body{padding:7px}
      #celarys-wild-stats-box .cws-upper{display:grid;grid-template-columns:1fr;gap:6px}
      #celarys-wild-stats-box .cws-profile{display:grid;grid-template-columns:72px minmax(0,1fr);gap:8px;border-bottom:2px solid var(--line);padding-bottom:6px}
      #celarys-wild-stats-box .cws-sprite{min-height:72px;display:grid;place-items:center;overflow:hidden;position:relative}
      #celarys-wild-stats-box .cws-sprite-sheet{width:64px;height:64px;image-rendering:pixelated;background-repeat:no-repeat}
      #celarys-wild-stats-box .cws-pokeball{width:44px;height:44px;border:4px solid #555;border-radius:50%;background:linear-gradient(#8f3034 0 44%,#555 45% 55%,#d9d9d3 56%)}
      #celarys-wild-stats-box .cws-profile-info{padding:2px 0}
      #celarys-wild-stats-box .cws-name-row{display:flex;gap:6px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}
      #celarys-wild-stats-box .cws-battle-kind{flex:0 0 auto;padding:2px 5px;background:#f0c43e;color:#29230d;border-radius:3px;font-weight:900;text-shadow:none}
      #celarys-wild-stats-box .cws-hpline{margin:6px 0;color:#fff}
      #celarys-wild-stats-box .cws-types{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}
      #celarys-wild-stats-box .cws-type{padding:2px 5px;border:1px solid #d7d7d3;border-radius:3px;background:#363a38;font-weight:900}
      #celarys-wild-stats-box .cws-label{color:var(--muted);letter-spacing:.1em}
      #celarys-wild-stats-box .cws-ability{font-weight:900;color:#f4e927;margin-top:2px;overflow-wrap:anywhere;white-space:normal}
      #celarys-wild-stats-box .cws-stats{display:grid;align-content:start;border-radius:4px;padding:2px 8px;overflow:hidden}
      #celarys-wild-stats-box .cws-stats>div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;padding:2px 5px}
      #celarys-wild-stats-box .cws-stats span,#celarys-wild-stats-box .cws-stats b{font-weight:900}
      #celarys-wild-stats-box .cws-stats b{font-variant-numeric:tabular-nums}
      #celarys-wild-stats-box .cws-stats .cws-bst{border-bottom:0;margin-top:2px;padding-top:4px}
      #celarys-wild-stats-box .cws-divider{height:2px;background:var(--line);margin:6px 0}
      #celarys-wild-stats-box .cws-moves-title,#celarys-wild-stats-box .cws-move{display:grid;grid-template-columns:minmax(0,1fr) 34px 38px 38px;gap:4px;align-items:center}
      #celarys-wild-stats-box .cws-moves-title{padding:0 5px 5px;font-weight:900;border-bottom:2px solid var(--line)}
      #celarys-wild-stats-box .cws-moves-title small{text-align:center}
      #celarys-wild-stats-box .cws-move{min-height:34px;padding:4px 5px}
      #celarys-wild-stats-box .cws-move:last-child{border-bottom:0}
      #celarys-wild-stats-box .cws-move-name{display:flex;align-items:center;gap:5px;font-weight:900;overflow:hidden}
      #celarys-wild-stats-box .cws-move-name span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      #celarys-wild-stats-box .cws-cat{position:relative;width:13px;height:13px;flex:0 0 13px}
      #celarys-wild-stats-box .cws-cat.physical{background:#ffc928;clip-path:polygon(50% 0,61% 31%,85% 15%,69% 39%,100% 50%,69% 61%,85% 85%,61% 69%,50% 100%,39% 69%,15% 85%,31% 61%,0 50%,31% 39%,15% 15%,39% 31%)}
      #celarys-wild-stats-box .cws-cat.special{border:2px solid #1688ff;border-radius:50%}
      #celarys-wild-stats-box .cws-cat.special::after{content:"";position:absolute;inset:2px;border:1px solid #1688ff;border-radius:50%}
      #celarys-wild-stats-box .cws-num{text-align:center;font-weight:900;font-variant-numeric:tabular-nums}
      #celarys-wild-stats-box .cws-unknown{color:#888}
      #celarys-wild-stats-box .cws-bottom{display:flex;justify-content:space-between;gap:6px;flex-wrap:wrap;padding:0 10px 7px;color:#ffd9c8;font-size:7px;font-weight:900;letter-spacing:.08em}
      #celarys-wild-stats-box::-webkit-resizer{background:linear-gradient(135deg,transparent 0 35%,#fff1b8 36% 45%,transparent 46% 55%,#fff1b8 56% 65%,transparent 66%)}
      @container (max-width:315px){
        #celarys-wild-stats-box .cws-title b{font-size:17px}
        #celarys-wild-stats-box .cws-name{font-size:16px}
        #celarys-wild-stats-box .cws-battle-kind{font-size:12px}
        #celarys-wild-stats-box .cws-hpline,#celarys-wild-stats-box .cws-ability{font-size:14px}
        #celarys-wild-stats-box .cws-type,#celarys-wild-stats-box .cws-label{font-size:12px}
        #celarys-wild-stats-box .cws-stats span,#celarys-wild-stats-box .cws-stats b{font-size:15px}
        #celarys-wild-stats-box .cws-moves-title span,#celarys-wild-stats-box .cws-moves-title small{font-size:13px}
        #celarys-wild-stats-box .cws-move-name,#celarys-wild-stats-box .cws-num{font-size:14px}
        #celarys-wild-stats-box .cws-topbar{grid-template-columns:30px minmax(0,1fr) auto;gap:6px;padding:5px 7px}
        #celarys-wild-stats-box .cws-lens{width:26px;height:26px}
        #celarys-wild-stats-box .cws-profile{grid-template-columns:60px minmax(0,1fr);gap:6px}
        #celarys-wild-stats-box .cws-sprite{min-height:60px}
        #celarys-wild-stats-box .cws-sprite-sheet{width:54px;height:54px}
        #celarys-wild-stats-box .cws-body{padding:5px}
        #celarys-wild-stats-box .cws-stats{padding:2px 5px}
        #celarys-wild-stats-box .cws-moves-title,#celarys-wild-stats-box .cws-move{grid-template-columns:minmax(0,1fr) 30px 34px 34px;gap:3px}
      }
      @container (max-width:270px){
        #celarys-wild-stats-box .cws-title b{font-size:15px}
        #celarys-wild-stats-box .cws-name{font-size:14px}
        #celarys-wild-stats-box .cws-hpline,#celarys-wild-stats-box .cws-ability{font-size:13px}
        #celarys-wild-stats-box .cws-stats span,#celarys-wild-stats-box .cws-stats b{font-size:14px}
        #celarys-wild-stats-box .cws-move-name,#celarys-wild-stats-box .cws-num{font-size:12px}
        #celarys-wild-stats-box .cws-moves-title span,#celarys-wild-stats-box .cws-moves-title small{font-size:11px}
        #celarys-wild-stats-box .cws-topbar{grid-template-columns:minmax(0,1fr) auto}
        #celarys-wild-stats-box .cws-lens{display:none}
        #celarys-wild-stats-box .cws-profile{grid-template-columns:1fr}
        #celarys-wild-stats-box .cws-profile>div:first-child{display:flex!important;align-items:center;gap:5px}
        #celarys-wild-stats-box .cws-sprite{min-height:48px;width:50px;flex:0 0 50px}
        #celarys-wild-stats-box .cws-sprite-sheet{width:46px;height:46px}
        #celarys-wild-stats-box .cws-types{margin:0}
        #celarys-wild-stats-box .cws-moves-title,#celarys-wild-stats-box .cws-move{grid-template-columns:minmax(0,1fr) 27px 30px 30px;gap:2px;padding-left:3px;padding-right:3px}
      }
      @container (max-width:230px){
        #celarys-wild-stats-box .cws-title b{font-size:14px}
        #celarys-wild-stats-box .cws-leds{display:none}
        #celarys-wild-stats-box .cws-topbar{grid-template-columns:1fr;padding:5px 6px}
        #celarys-wild-stats-box .cws-profile>div:first-child{display:block!important}
        #celarys-wild-stats-box .cws-sprite{display:none}
        #celarys-wild-stats-box .cws-name{font-size:13px}
        #celarys-wild-stats-box .cws-battle-kind,#celarys-wild-stats-box .cws-type,#celarys-wild-stats-box .cws-label{font-size:10px}
        #celarys-wild-stats-box .cws-hpline,#celarys-wild-stats-box .cws-ability{font-size:12px}
        #celarys-wild-stats-box .cws-stats span,#celarys-wild-stats-box .cws-stats b{font-size:12px}
        #celarys-wild-stats-box .cws-move-name,#celarys-wild-stats-box .cws-num{font-size:11px}
        #celarys-wild-stats-box .cws-cat{display:none}
        #celarys-wild-stats-box .cws-move-name{gap:0}
        #celarys-wild-stats-box .cws-moves-title,#celarys-wild-stats-box .cws-move{grid-template-columns:minmax(0,1fr) 25px 28px 28px}
      }
    `;

    (document.head || document.documentElement).appendChild(style);
    (document.body || document.documentElement).appendChild(box);
    box.style.display = "none";
    makeDraggable(box);
    return box;
  };

  const ensureOverlay = () => document.documentElement ? createOverlay() : null;

  const fitDefaultLayout = () => {
    if (defaultLayoutApplied || loadOverlayState()) return;
    const box = document.getElementById("celarys-wild-stats-box");
    if (!box || box.style.display === "none") return;
    requestAnimationFrame(() => {
      box.style.width = `${Math.min(340, Math.max(140, innerWidth - 20))}px`;
      box.style.height = "auto";
      requestAnimationFrame(() => {
        const available = Math.max(180, innerHeight - 16);
        const wanted = Math.ceil(box.scrollHeight + 2);
        box.style.height = `${Math.min(wanted, available)}px`;
        defaultLayoutApplied = true;
      });
    });
  };

  const setStatus = text => {
    showDex();
    const status = document.getElementById("cws-status");
    const body = document.getElementById("cws-body");
    if (status) { status.textContent = text; status.style.display = ""; }
    if (body) body.style.display = "none";
  };

  let seasonSlug = null;

  const getSeasonSlug = () => {
    if (seasonSlug) return seasonSlug;

    const route = location.pathname.match(/\/(season_\d+)(?:\/|$)/i);
    if (route) {
      seasonSlug = route[1].toLowerCase();
      return seasonSlug;
    }

    const m = getModule();
    if (m) {
      try {
        const ptr = m.ccall("se_startup_get_patch_path", "number", [], []);
        const value = ptr ? m.UTF8ToString(ptr) : "";
        const match = value.match(/\/(season_\d+)\//i);
        if (match) {
          seasonSlug = match[1].toLowerCase();
          return seasonSlug;
        }
      } catch {}
    }

    return "season_4";
  };

  const updateSprite = speciesId => {
    const host = document.getElementById("cws-sprite");
    if (!host) return;
    host.textContent = "";

    const id = Math.floor(Number(speciesId) || 0);
    if (id <= 0 || id > 1599) {
      const ball = document.createElement("div");
      ball.className = "cws-pokeball";
      host.appendChild(ball);
      return;
    }

    const cols = 32, rows = 50;
    const col = id % cols;
    const row = Math.floor(id / cols);
    const spr = document.createElement("div");
    spr.className = "cws-sprite-sheet";
    spr.style.backgroundImage = `url("/assets/games/${getSeasonSlug()}/resources/pokemon_icon/pokemon_normal.png")`;
    spr.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
    spr.style.backgroundPosition =
      `${col / (cols - 1) * 100}% ${Math.min(row, rows - 1) / (rows - 1) * 100}%`;
    host.appendChild(spr);
  };

  const renderTypes = types => {
    const host = document.getElementById("cws-types");
    if (!host) return;
    host.textContent = "";
    for (const t of Array.isArray(types) ? types : []) {
      if (!t) continue;
      const el = document.createElement("span");
      el.className = "cws-type";
      el.textContent = String(t).toUpperCase();
      host.appendChild(el);
    }
  };

  const showStats = (data, stats) => {
    showDex();

    const status = document.getElementById("cws-status");
    const body = document.getElementById("cws-body");
    if (status) status.style.display = "none";
    if (body) body.style.display = "";

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value ?? "—";
    };

    set("cws-name", `${data.enemy.name} · Lv.${stats.level}`);
    set("cws-battle-kind", data.isWild ? "WILD" : "TRAINER");
    set("cws-hpline", `HP ${stats.hp} / ${stats.hpMax}`);
    set("cws-ability", getStableAbility(data));
    set("cws-hp", stats.hpMax);
    set("cws-atk", stats.atk);
    set("cws-def", stats.def);
    set("cws-spa", stats.spa);
    set("cws-spd", stats.spd);
    set("cws-spe", stats.spe);
    set("cws-bst", (data.enemy.bst && data.enemy.bst > 0) ? data.enemy.bst : (BST_DB[data.enemy.speciesId] ?? "—"));
    renderTypes(data.enemy.types);
    updateSprite(data.enemy.speciesId);

    const movesHost = document.getElementById("cws-moves");
    if (movesHost) {
      movesHost.textContent = "";
      for (const move of stats.moves) {
        const row = document.createElement("div");
        row.className = "cws-move";

        const cat = String(move.category || "").toLowerCase();
        const power = move.power == null || move.power === 0 ? "—" : move.power;
        const accuracy = move.accuracy == null || move.accuracy === 0 ? "—" : move.accuracy;

        const moveColor = TYPE_COLORS[String(move.type || "").toUpperCase()] || "#f2f2ed";
        row.innerHTML = `
          <div class="cws-move-name">
            <span class="cws-cat ${cat}"></span>
            <span style="color:${moveColor}">${move.name || "—"}</span>
          </div>
          <div class="cws-num">${move.id ? move.pp : "—"}</div>
          <div class="cws-num ${power === "—" ? "cws-unknown" : ""}">${power}</div>
          <div class="cws-num ${accuracy === "—" ? "cws-unknown" : ""}">${accuracy}</div>
        `;
        movesHost.appendChild(row);
      }
    }

    fitDefaultLayout();
  };

  const captureInstance = result => {
    try {
      const instance = result?.instance ?? result;
      const exports = instance?.exports;
      if (!exports) return;

      window.__startabDexInstances ??= [];
      if (!window.__startabDexInstances.includes(instance)) window.__startabDexInstances.push(instance);

      const memories = Object.values(exports).filter(value => value instanceof WebAssembly.Memory);
      for (const memory of memories) {
        if (!wasmMemory || memory.buffer.byteLength > wasmMemory.buffer.byteLength) wasmMemory = memory;
      }

      const namedMemory = exports.Tf instanceof WebAssembly.Memory
        ? exports.Tf
        : exports.Sf instanceof WebAssembly.Memory
          ? exports.Sf
          : exports.memory instanceof WebAssembly.Memory
            ? exports.memory
            : memories.sort((a, b) => b.buffer.byteLength - a.buffer.byteLength)[0] ?? null;

      const newTrackerAbi = exports.Tf instanceof WebAssembly.Memory && typeof exports.bh === "function" && typeof exports.$g === "function";
      const oldTrackerAbi = exports.Sf instanceof WebAssembly.Memory && typeof exports.$g === "function" && typeof exports.Zg === "function";

      const getJson = newTrackerAbi
        ? exports.bh
        : oldTrackerAbi
          ? exports.$g
          : typeof exports.celarys_tracker_get_json === "function"
            ? exports.celarys_tracker_get_json
            : typeof exports._celarys_tracker_get_json === "function"
              ? exports._celarys_tracker_get_json
              : null;

      const freeJson = newTrackerAbi
        ? exports.$g
        : oldTrackerAbi
          ? exports.Zg
          : typeof exports.celarys_tracker_free_json === "function"
            ? exports.celarys_tracker_free_json
            : typeof exports._celarys_tracker_free_json === "function"
              ? exports._celarys_tracker_free_json
              : null;

      if (getJson && namedMemory) {
        coreInstance = instance;
        coreExports = exports;
        trackerGetJson = getJson;
        trackerFreeJson = freeJson;
        trackerMemory = namedMemory;
        wasmMemory = namedMemory;
        window.__startabDexCoreInstance = coreInstance;
        window.__startabDexCoreExports = coreExports;
        window.__startabDexTrackerSource = "wasm-ready";
      }

      if (wasmMemory) window.__startabDexMemory = wasmMemory;
      window.__startabDexInstanceSummary = window.__startabDexInstances.map((x, i) => ({
        i,
        memory: Object.values(x.exports).filter(v => v instanceof WebAssembly.Memory).map(v => v.buffer.byteLength),
        hasTracker: (x.exports.Tf instanceof WebAssembly.Memory && typeof x.exports.bh === "function" && typeof x.exports.$g === "function") || (x.exports.Sf instanceof WebAssembly.Memory && typeof x.exports.$g === "function" && typeof x.exports.Zg === "function") || typeof x.exports.celarys_tracker_get_json === "function" || typeof x.exports._celarys_tracker_get_json === "function",
        trackerAbi: x.exports.Tf instanceof WebAssembly.Memory && typeof x.exports.bh === "function" ? "2026-09" : x.exports.Sf instanceof WebAssembly.Memory && typeof x.exports.$g === "function" ? "legacy" : null,
        keys: Object.keys(x.exports).length
      }));
    } catch (e) {
      console.warn("[StartAB Dex] captureInstance", e);
    }
  };

  const oldInstantiate = WebAssembly.instantiate;
  WebAssembly.instantiate = async function(...args) {
    const result = await oldInstantiate.apply(this, args);
    captureInstance(result);
    return result;
  };

  if (WebAssembly.instantiateStreaming) {
    const oldStreaming = WebAssembly.instantiateStreaming;
    WebAssembly.instantiateStreaming = async function(...args) {
      const result = await oldStreaming.apply(this, args);
      captureInstance(result);
      return result;
    };
  }

  const leadMatches = (base, lead, u8, u16) => (
    base >= 0 &&
    base + PARTY_SIZE <= u8.length &&
    u8[base + 84] === lead.level &&
    read16(u16, base + 86) === lead.hp &&
    read16(u16, base + 88) === lead.hpMax &&
    read16(u16, base + 90) === lead.stats.atk &&
    read16(u16, base + 92) === lead.stats.def &&
    read16(u16, base + 94) === lead.stats.spe &&
    read16(u16, base + 96) === lead.stats.spa &&
    read16(u16, base + 98) === lead.stats.spd
  );

  const findEnemySlot = (partyStart, data, u8) => {
    const species = Number(data?.enemy?.speciesId) || 0;
    const level = Number(data?.enemy?.level) || 0;

    if (!data?.isWild) {
      const slot0 = partyStart;
      if (
        slot0 >= 0 &&
        slot0 + PARTY_SIZE <= u8.length &&
        u8[slot0 + 84] === level
      ) return slot0;

      for (let slot = 1; slot < PARTY_SLOTS; slot++) {
        const base = partyStart + slot * PARTY_SIZE;
        if (base < 0 || base + PARTY_SIZE > u8.length) continue;
        if (u8[base + 84] === level) return base;
      }

      return null;
    }

    for (let slot = 0; slot < PARTY_SLOTS; slot++) {
      const base = partyStart + slot * PARTY_SIZE;
      if (base < 0 || base + PARTY_SIZE > u8.length) continue;
      if (u8[base + 84] !== level) continue;
      if (species > 0 && decodeSpecies(base, u8) !== species) continue;
      return base;
    }

    const slot0 = partyStart;
    if (
      slot0 >= 0 &&
      slot0 + PARTY_SIZE <= u8.length &&
      u8[slot0 + 84] === level
    ) return slot0;

    return null;
  };

  const calibrate = data => {
    const views = getViews();
    if (!views || !data?.lead?.stats) return false;
    const {u8,u16} = views;
    const lead = data.lead;

    if (playerBase != null && leadMatches(playerBase, lead, u8, u16)) {
      const enemy = findEnemySlot(playerBase - PARTY_DELTA, data, u8);
      if (enemy != null) {
        currentEnemyBase = enemy;
        return true;
      }
    }

    const pattern = [
      lead.hp, lead.hpMax, lead.stats.atk, lead.stats.def,
      lead.stats.spe, lead.stats.spa, lead.stats.spd
    ];

    let pos = 0;
    while (true) {
      pos = u16.indexOf(pattern[0], pos);
      if (pos === -1) break;

      let ok = true;
      for (let i = 1; i < pattern.length; i++) {
        if (u16[pos + i] !== pattern[i]) { ok = false; break; }
      }

      if (ok) {
        const base = pos * 2 - 86;
        if (leadMatches(base, lead, u8, u16)) {
          const enemy = findEnemySlot(base - PARTY_DELTA, data, u8);
          if (enemy != null) {
            playerBase = base;
            currentEnemyBase = enemy;
            window.__startabDexPlayerBase = base;
            return true;
          }
        }
      }
      pos++;
    }

    playerBase = null;
    currentEnemyBase = null;
    return false;
  };

  const readEnemyStats = data => {
    const views = getViews();
    if (!views || playerBase == null) return null;
    const {u8,u16} = views;

    currentEnemyBase = findEnemySlot(playerBase - PARTY_DELTA, data, u8);
    const base = currentEnemyBase;
    if (base == null) return null;

    const hpMax = read16(u16, base + 88);
    const level = u8[base + 84];
    if (level !== data.enemy.level || hpMax <= 0 || hpMax > 2000) return null;

    return {
      level,
      hp: read16(u16, base + 86),
      hpMax,
      atk: read16(u16, base + 90),
      def: read16(u16, base + 92),
      spe: read16(u16, base + 94),
      spa: read16(u16, base + 96),
      spd: read16(u16, base + 98),
      moves: decodeEnemyMoves(base, data, u8)
    };
  };

  const tick = () => {
    try {
      createActiveBadge();

      if (!wasmMemory) {
        showActiveBadge();
        return;
      }

      const data = getTracker();
      if (!data?.valid) {
        showActiveBadge();
        return;
      }

      if (!data.inBattle || !data.enemy?.name) {
        if (lastBattleState) lastEncounterId = null;
        lastBattleState = false;
        abilityEncounterKey = "";
        abilityPending = "";
        abilityPendingCount = 0;
        abilityDisplay = "…";
        showActiveBadge();
        return;
      }

      lastBattleState = true;

      let stats = readEnemyStats(data);
      if (!stats) {
        if (!calibrate(data)) {
          setStatus(`Calibrazione RAM · ${data.enemy.name} Lv.${data.enemy.level}`);
          return;
        }
        stats = readEnemyStats(data);
      }

      if (!stats) {
        setStatus("Dati RAM non validi");
        return;
      }

      showStats(data, stats);

      const encounterId = `${data.enemy.speciesId}|${data.enemy.level}|${data.seq ?? ""}|${currentEnemyBase ?? ""}`;
      if (encounterId !== lastEncounterId) {
        lastEncounterId = encounterId;
        console.log("[StartAB Dex]", data.enemy.name, stats);
      }
    } catch (e) {
      console.error("[StartAB Dex]", e);
      setStatus("Errore — apri la Console");
    }
  };

  let started = false;

  const start = () => {
    if (started) return;
    started = true;
    createActiveBadge();
    ensureOverlay();
    showActiveBadge();
    window.__startabDexInterval = setInterval(tick, POLL_MS);
    console.log("[StartAB Dex] v0.7.5", {path: location.pathname, season: getSeasonSlug()});
  };

  const maybeStart = () => {
    if (started || !isEmulatorRoute()) return;
    if (document.readyState === "loading") return;
    start();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", maybeStart, {once:true});
  } else {
    maybeStart();
  }

  const routeTimer = setInterval(() => {
    maybeStart();
    if (started) clearInterval(routeTimer);
  }, 500);
})();
