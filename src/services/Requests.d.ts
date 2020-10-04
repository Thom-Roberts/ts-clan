/*******************
 * Group V2
********************/
export interface GroupApiResponse {
	Response: GroupResponse;
	ErrorCode: number;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: Record<string, string>;
	DetailedErrorTrace: string;
}

// https://bungie-net.github.io/multi/schema_GroupsV2-GroupResponse.html#schema_GroupsV2-GroupResponse
interface GroupResponse {
	detail: GroupV2;
	founder: GroupMember;
	alliedIds: number[];
	parentGroup: GroupApiResponse;
	allianceStatus: number;
	groupJoinInviteCount: number;
	currentUserMembershipsInactiveForDestiny: boolean;
	currentUserMemberMap: Record<number, GroupMember>;
	currentUserPotentialMemberMap: Record<number, GroupPotentialMember>;
}

interface GroupV2 {
	groupId: number;
	name: string;
	groupType: string;
	membershipIdCreated: number;
	creationDate: Date;
	modificationDate: Date;
	about: string;
	tags: string[];
	memberCount: number;
	isPublic: boolean;
	isPublicTopicAdminOnly: boolean;
	motto: string;
	allowChat: boolean;
	isDefaultPostPublic: boolean;
	chatSecurity: number;
	locale: string;
	avatarImageIndex: number;
	homepage: number;
	membershipOption: number;
	defaultPublicity: number;
	theme: string;
	bannerPath: string;
	avatarPath: string;
	conversationId: number;
	enableInvitationMessagingForAdmins: boolean;
	banExpireDate: Date | null;
	features: GroupFeatures;
	clanInfo: ClanInfoAndInvestment;
}

interface GroupFeatures {
	maximumMembers: number;
	maximumMembershipsOfGroupType: number;
	capabilities: number;
	membershipTypes: number[];
	invitePermissionOverride: boolean;
	updateCulturePermissionOverride: boolean;
	hostGuidedGamePermissionOverride: number;
	updateBannerPermissionOverride: boolean;
	joinLevel: number;
}

interface ClanInfoAndInvestment {
	d2ClanProgressions: Record<number, DestinyProgression>;
	clanCallsign: string;
	clanBannerData: ClanBanner;
}

interface GroupMember {
	memberType: number;
	isOnline: boolean;
	lastOnlineStatusChange: number;
	groupId: number;
	destinyUserInfo: any;
	bungieNetUserInfo: any;
	joinDate: Date;
}

interface GroupPotentialMember {
	potentialStatus: number;
	groupId: number;
	destinyUserInfo: any;
	bungieNetUserInfo: any;
	joinDate: Date;
}

interface DestinyProgression {
	progressionHash: number;
	dailyProgress: number;
	dailyLimit: number;
	weeklyProgress: number;
	weeklyLimit: number;
	currentProgress: number;
	level: number;
	levelCap: number;
	stepIndex: number;
	progressToNextLevel: number;
	nextLevelAt: number;
	currentResetCount: number | null;
	seasonResets: {season: number; resets: number;}[];
	rewardItemStates: number;
}

interface ClanBanner {
	decalId: number;
	decalColorId: number;
	decalBackgroundColorId: number;
	gonfalonId: number;
	gonfalonColorId: number;
	gonfalonDetailId: number;
	gonfalonDetailColorId: number;
}

/*******************
 * Weekly Reward State
********************/
export interface WeeklyRewardResponse {
	Response: DestinyMilestone;
	ErrorCode: number;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: Record<string, string>;
	DetailedErrorTrace: string;
}

interface DestinyMilestone {
	milestoneHash: number;
	availableQuests: MilestoneQuest[];
	activities: MilestoneChallenge[];
	values: Record<string, number>;
	vendorHashes: number[];
	vendors: MilestoneVendor[];
	rewards: MilestoneRewardCategory[];
	startDate: Date | null;
	endDate: Date | null;
	order: number;
}

interface MilestoneQuest {
	questItemHash: number;
	status: any;
	activity: any; // DestinyMilestoneActivity
	challenges: any[]; // DestinyChallengeStatus
}

interface MilestoneChallenge {
	activityHash: number;
	challenges: any[]; // DestinyChallengeStatus
	modifierHashes: number[];
	booleanActivityOptions: Record<number, boolean>;
	loadoutRequirementIndex: number;
	phases: any[]; // DestinyMilestoneActivityPhase
}

interface MilestoneVendor {
	vendorHash: number;
	previewItemHash: number;
}

interface MilestoneRewardCategory {
	rewardCategoryHash: number;
	entries: any[]; // DestinyMilestoneRewardEntry
}