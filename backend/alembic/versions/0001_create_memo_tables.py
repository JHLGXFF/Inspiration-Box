"""create memo tables

Revision ID: 0001_create_memo_tables
Revises: 
Create Date: 2026-01-06
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0001_create_memo_tables"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "memo",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("content", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_table(
        "tag",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("name", sa.String(), nullable=False),
    )
    op.create_index("ix_tag_name", "tag", ["name"], unique=True)
    op.create_table(
        "memotag",
        sa.Column("memo_id", sa.Integer(), nullable=False),
        sa.Column("tag_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["memo_id"], ["memo.id"]),
        sa.ForeignKeyConstraint(["tag_id"], ["tag.id"]),
        sa.PrimaryKeyConstraint("memo_id", "tag_id"),
    )


def downgrade() -> None:
    op.drop_table("memotag")
    op.drop_index("ix_tag_name", table_name="tag")
    op.drop_table("tag")
    op.drop_table("memo")
