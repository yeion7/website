class CreateTrackConceptContributorships < ActiveRecord::Migration[6.1]
  def change
    create_table :track_concept_contributorships do |t|
      t.belongs_to :track_concept, foreign_key: true, null: false
      t.belongs_to :user, foreign_key: true, null: false

      t.timestamps

      t.index %i[track_concept_id user_id], name: "index_concept_contributorship_on_track_concept_id_and_user_id", unique: true
    end
  end
end
