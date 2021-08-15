export class User {
    constructor(
      public id: string,
      public name: string,
    ) {  }
}

export class UserProfile {
  constructor(
    public BusinessEntity: string,
    public LoginType: string,
    public LoginName: string,
    public FullName: string,
    public Email: string,
    public BranchName: string,
    public RankName: string,
    public QRUidUrl: string,
    public QRImage64: string | null,
    public AvatarImage64: string | null
  ) {  }
}

export interface QRId {
  userName: string,
  agentCode: string,
  avatarImage64: string
}

export class QRIdInfo {
  constructor(
    public qrId: string,
    public userName: string,
    public avatarImage64: string
  ) { }
}