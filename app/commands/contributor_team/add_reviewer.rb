class ContributorTeam
  class AddReviewer
    include Mandate

    initialize_with :user, :attributes

    def call
      team = ContributorTeam.find_by!(track: nil, type: :reviewers)
      Github::Team::AddMember.(team.github_name, user.github_username)
      ContributorTeam::Membership::CreateOrUpdate.(user, team, attributes)
      user.update(roles: user.roles + [:reviewer]) unless user.roles.include?(:reviewer)
    end
  end
end
